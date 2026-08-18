// First-party shared WebGL2 shader runtime (no dependencies).
// Responsibilities: context + program setup, devicePixelRatio cap 2,
// pause when off-viewport (IntersectionObserver) or document.hidden,
// prefers-reduced-motion = render exactly one static frame,
// lerped pointer uniform, palette colors resolved from --bw-* variables.

const VERT = `#version 300 es
layout(location=0) in vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`

// Resolve any CSS color expression (hex, oklch, color-mix, var()) to [r,g,b] 0..1
// by letting the browser compute it.
export function resolveCssColor(expr, fallback = [1, 1, 1]) {
  try {
    const probe = document.createElement('span')
    probe.style.color = expr
    probe.style.display = 'none'
    document.body.appendChild(probe)
    const rgb = getComputedStyle(probe).color
    probe.remove()
    const m = rgb.match(/[\d.]+/g)
    if (!m || m.length < 3) return fallback
    return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255]
  } catch {
    return fallback
  }
}

export function paletteColor(varName, fallback) {
  return resolveCssColor(`var(${varName})`, fallback)
}

// Rotate the hue of an [r,g,b] 0..1 color by `deg` (HSL rotation in JS so
// derived shader hues re-key with the palette, matching the CSS oklch trick).
export function rotateHue([r, g, b], deg) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  if (d === 0) return [r, g, b]
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  h = (h + deg / 360 + 10) % 1
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const hue = (t) => {
    let x = (t + 1) % 1
    if (x < 1 / 6) return p + (q - p) * 6 * x
    if (x < 1 / 2) return q
    if (x < 2 / 3) return p + (q - p) * (2 / 3 - x) * 6
    return p
  }
  return [hue(h + 1 / 3), hue(h), hue(h - 1 / 3)]
}

// Mount a full-quad fragment shader on `canvas`.
// opts: { frag, colors(): {name: [r,g,b]}, pointerEl, staticTime }
// Returns a destroy() function. Throws if WebGL2 is unavailable so the
// caller can fall back to the CSS treatment.
export function createShaderScene(canvas, opts) {
  const gl = canvas.getContext('webgl2', {
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  })
  if (!gl) throw new Error('webgl2 unavailable')

  const compile = (type, src) => {
    const sh = gl.createShader(type)
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(sh)
      gl.deleteShader(sh)
      throw new Error(`shader compile: ${log}`)
    }
    return sh
  }
  const program = gl.createProgram()
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, opts.frag))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`program link: ${gl.getProgramInfoLog(program)}`)
  }
  gl.useProgram(program)

  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  const loc = (n) => gl.getUniformLocation(program, n)
  const uRes = loc('uRes')
  const uTime = loc('uTime')
  const uPointer = loc('uPointer')
  const uActive = loc('uActive')
  const colorLocs = {}

  const setColors = () => {
    const colors = opts.colors ? opts.colors() : {}
    for (const [name, rgb] of Object.entries(colors)) {
      if (!(name in colorLocs)) colorLocs[name] = loc(name)
      if (colorLocs[name]) gl.uniform3f(colorLocs[name], rgb[0], rgb[1], rgb[2])
    }
  }
  setColors()

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let running = false
  let inView = true
  let raf = 0
  let destroyed = false
  let contextLost = false
  const start = performance.now()
  // Pointer state, lerped in the loop for weight.
  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: 0, tActive: 0 }

  // Adaptive quality: if the running frame-time average stays above ~30ms,
  // step the internal resolution down (up to twice). Slow GPUs get a softer
  // field instead of a stuttering one.
  let adaptive = 1
  let emaDt = 16
  let checkStart = 0
  let lastNow = 0

  const resize = () => {
    // DPR capped at 2; atmospheric full-bleed shaders can additionally pass
    // resScale < 1 to render at reduced internal resolution and upscale —
    // invisible on soft gradient fields, huge fragment-cost win.
    const dpr = Math.min(window.devicePixelRatio || 1, 2) * (opts.resScale || 1) * adaptive
    let w = Math.max(1, Math.round(canvas.clientWidth * dpr))
    let h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (opts.maxDim && Math.max(w, h) > opts.maxDim) {
      const k = opts.maxDim / Math.max(w, h)
      w = Math.max(1, Math.round(w * k))
      h = Math.max(1, Math.round(h * k))
    }
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    }
  }

  const draw = (t) => {
    resize()
    gl.uniform2f(uRes, canvas.width, canvas.height)
    gl.uniform1f(uTime, t)
    pointer.x += (pointer.tx - pointer.x) * 0.07
    pointer.y += (pointer.ty - pointer.y) * 0.07
    pointer.active += (pointer.tActive - pointer.active) * 0.05
    gl.uniform2f(uPointer, pointer.x, pointer.y)
    gl.uniform1f(uActive, pointer.active)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const loop = () => {
    if (!running || destroyed || contextLost) return
    const now = performance.now()
    if (lastNow) {
      emaDt = emaDt * 0.9 + (now - lastNow) * 0.1
      if (!checkStart) checkStart = now
      if (now - checkStart > 2500 && emaDt > 30 && adaptive > 0.3) {
        adaptive *= 0.6
        checkStart = now
        emaDt = 16
      }
    }
    lastNow = now
    draw((now - start) / 1000)
    raf = requestAnimationFrame(loop)
  }
  const play = () => {
    if (reduced || running || destroyed || contextLost) return
    if (!inView || document.hidden) return
    running = true
    lastNow = 0 // don't count paused time as a frame
    raf = requestAnimationFrame(loop)
  }
  const pause = () => {
    running = false
    cancelAnimationFrame(raf)
  }

  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    if (inView) play()
    else pause()
  }, { threshold: 0.01 })
  io.observe(canvas)

  const onVisibility = () => {
    if (document.hidden) pause()
    else play()
  }
  document.addEventListener('visibilitychange', onVisibility)

  const pointerEl = opts.pointerEl || canvas
  const onMove = (e) => {
    const rect = canvas.getBoundingClientRect()
    pointer.tx = (e.clientX - rect.left) / Math.max(rect.width, 1)
    pointer.ty = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1)
    pointer.tActive = 1
  }
  const onLeave = () => { pointer.tActive = 0 }
  if (!reduced) {
    pointerEl.addEventListener('pointermove', onMove, { passive: true })
    pointerEl.addEventListener('pointerleave', onLeave, { passive: true })
  }

  const onPalette = () => {
    setColors()
    if (reduced) draw(opts.staticTime ?? 8)
  }
  window.addEventListener('bw:palette', onPalette)

  const onLost = (e) => {
    e.preventDefault()
    contextLost = true
    pause()
    canvas.style.opacity = '0' // CSS fallback beneath shows through
  }
  canvas.addEventListener('webglcontextlost', onLost)

  const ro = new ResizeObserver(() => {
    if (reduced || !running) draw(reduced ? (opts.staticTime ?? 8) : (performance.now() - start) / 1000)
  })
  ro.observe(canvas)

  if (reduced) {
    // Single hand-picked frame; no loop, no pointer.
    draw(opts.staticTime ?? 8)
  } else {
    play()
  }

  return () => {
    destroyed = true
    pause()
    io.disconnect()
    ro.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('bw:palette', onPalette)
    canvas.removeEventListener('webglcontextlost', onLost)
    pointerEl.removeEventListener('pointermove', onMove)
    pointerEl.removeEventListener('pointerleave', onLeave)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}

// Cheap capability probe used by wrappers before dynamic-importing the chunk.
export function webgl2Available() {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}
