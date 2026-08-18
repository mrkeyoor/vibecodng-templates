// Signature hero backdrop: raw WebGL2 GPU data-stream field.
// First-party GLSL. Fully stateless: every particle is derived from
// gl_VertexID + time inside the vertex shader — zero attribute buffers,
// zero CPU simulation, zero per-frame uploads. Two draw calls:
//   1. GL_LINES  — motion-streak trails riding horizontal "lanes"
//   2. GL_POINTS — glowing packet heads + free-floating dust
// Pointer parallax bends the whole field; a repulsion radius pushes
// streams aside and brightens them. Terminal-green on near-black.
// Perf contract: DPR capped at 2, rAF paused off-viewport
// (IntersectionObserver) and on document.hidden; prefers-reduced-motion
// renders exactly one static frame. Returns null without WebGL2 so the
// existing CSS grid + spotlight backdrop remains the fallback.
import { useEffect, useRef } from 'react'

const STREAMS = 3000 // line-streak particles
const MOTES = 3000 // head/dust particles (same ids, points pass)

const VERT = /* glsl */ `#version 300 es
precision highp float;
uniform vec2  u_res;     // CSS px
uniform float u_time;
uniform vec2  u_pointer; // CSS px, lerped
uniform float u_active;  // pointer presence 0..1
uniform float u_dpr;
uniform float u_pass;    // 0 = lines, 1 = points
out vec3  v_col;
out float v_alpha;

float h1(float n) { return fract(sin(n) * 43758.5453123); }

void main() {
  int pid = (u_pass < 0.5) ? gl_VertexID / 2 : gl_VertexID;
  float endp = (u_pass < 0.5) ? float(gl_VertexID & 1) : 0.0; // 0 head, 1 tail
  float fp = float(pid);

  float s1 = h1(fp * 0.1031 + 7.13);
  float s2 = h1(fp * 0.2237 + 3.71);
  float s3 = h1(fp * 0.5663 + 9.29);
  float s4 = h1(fp * 0.7771 + 5.47);

  float dust = step(0.70, s4);          // 30% free-floating motes
  float packet = step(0.982, s1) * (1.0 - dust); // rare hot packets

  // lane structure: horizontal data rails with per-lane speed + activity
  float lanes = 30.0;
  float laneIdx = floor(s2 * lanes);
  float laneY = (laneIdx + 0.5) / lanes;
  float laneSpeed = mix(0.045, 0.16, h1(laneIdx * 1.618 + 2.39));
  float laneAct = h1(laneIdx * 3.11 + 1.77); // some lanes run hot, some idle
  float depth = mix(0.35, 1.0, s3);

  float speed = laneSpeed * mix(0.65, 1.35, s3) + packet * 0.16;
  speed = mix(speed, 0.006 + 0.015 * s3, dust);

  float head = fract(s1 + u_time * speed);
  // streak length in x01 units; capped so streaks stay elegant
  float trail = min(mix(0.42, 0.95, s2) * speed * 1.6, 0.11) * (1.0 - dust);
  float x01 = head - endp * trail;

  float streamY = laneY
    + (s4 - 0.5) * 0.006 * depth
    + 0.004 * depth * sin(u_time * 0.8 + s1 * 40.0);
  float dustY = s2
    + 0.05 * depth * sin(6.2831 * (s1 * 3.0 + s3) + u_time * (0.2 + 0.4 * s4));
  float y01 = mix(streamY, dustY, dust);

  // pointer parallax — deeper layers shift more
  vec2 pointer01 = u_pointer / max(u_res, vec2(1.0));
  vec2 par = (pointer01 - 0.5) * (0.04 * depth) * u_active;
  vec2 px = (vec2(x01, y01) + par) * u_res;

  // pointer repulsion in CSS-px space; bends trails around the cursor
  vec2 d = px - u_pointer;
  float dist = max(length(d), 0.001);
  float f = smoothstep(190.0, 0.0, dist) * u_active;
  px += (d / dist) * f * f * 80.0;

  // alpha shaping
  float edge = smoothstep(0.0, 0.05, head) * (1.0 - smoothstep(0.93, 1.0, head));
  float laneDim = mix(0.12, 1.0, smoothstep(0.30, 0.85, laneAct));
  float a = edge * laneDim * mix(0.5, 1.0, depth);
  a *= 1.0 - endp * 0.85;                       // trail fades toward tail
  a *= mix(1.0, 0.5, dust);
  a *= 0.75 + 0.25 * sin(u_time * (0.7 + 2.0 * s3) + fp); // shimmer
  if (u_pass > 0.5) a *= mix(1.0, 0.34, dust); // dust motes stay faint
  // keep the headline legible: dim an elliptical safe zone in the middle
  vec2 safeD = (vec2(x01, y01) - vec2(0.5, 0.42)) * vec2(1.25, 2.1);
  float safe = 1.0 - 0.78 * (1.0 - smoothstep(0.28, 0.72, length(safeD)));
  a *= safe * 0.68;
  v_alpha = a * (1.0 + 1.4 * f + packet * 0.9);

  // color: dim circuit green -> lime accent -> hot white packets
  vec3 dim = vec3(0.16, 0.40, 0.20);
  vec3 accent = vec3(0.725, 0.965, 0.424); // #B9F66C
  vec3 hot = vec3(0.93, 1.0, 0.86);
  vec3 col = mix(dim, accent, depth * (0.55 + 0.45 * laneDim));
  col = mix(col, hot, packet * 0.9 + f * 0.5);
  v_col = col;

  vec2 clip = (px / u_res) * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = (mix(1.2, 2.4, depth) + packet * 2.6 + f * 1.6) * u_dpr * (1.0 - dust * 0.35);
}
`

const FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform float u_pass;
in vec3 v_col;
in float v_alpha;
out vec4 outColor;
void main() {
  float a = v_alpha;
  if (u_pass > 0.5) {
    vec2 c = gl_PointCoord - 0.5;
    a *= smoothstep(0.5, 0.1, length(c));
  }
  a = clamp(a, 0.0, 1.0);
  if (a < 0.004) discard;
  outColor = vec4(v_col * a, a);
}
`

function compile(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

export default function HeroField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = canvas?.closest('section')
    if (!canvas || !section) return undefined
    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, powerPreference: 'low-power' })
    if (!gl) return undefined // CSS backdrop stays as the fallback

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return undefined
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined
    gl.useProgram(prog)

    const u = (name) => gl.getUniformLocation(prog, name)
    const uRes = u('u_res')
    const uTime = u('u_time')
    const uPointer = u('u_pointer')
    const uActive = u('u_active')
    const uDpr = u('u_dpr')
    const uPass = u('u_pass')

    // additive glow, premultiplied so the canvas composites over the page
    gl.enable(gl.BLEND)
    gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    let w = 0
    let h = 0
    const resize = () => {
      const rect = section.getBoundingClientRect()
      w = Math.max(rect.width, 1)
      h = Math.max(rect.height, 1)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(section)

    const pointer = { x: w * 0.5, y: h * 0.4, tx: w * 0.5, ty: h * 0.4, active: 0, tActive: 0 }
    const onMove = (event) => {
      const rect = section.getBoundingClientRect()
      pointer.tx = event.clientX - rect.left
      pointer.ty = event.clientY - rect.top
      pointer.tActive = 1
    }
    const onLeave = () => { pointer.tActive = 0 }

    const draw = (t) => {
      pointer.x += (pointer.tx - pointer.x) * 0.08
      pointer.y += (pointer.ty - pointer.y) * 0.08
      pointer.active += (pointer.tActive - pointer.active) * 0.05
      gl.uniform2f(uRes, w, h)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uPointer, pointer.x, pointer.y)
      gl.uniform1f(uActive, pointer.active)
      gl.uniform1f(uDpr, dpr)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uPass, 0)
      gl.drawArrays(gl.LINES, 0, STREAMS * 2)
      gl.uniform1f(uPass, 1)
      gl.drawArrays(gl.POINTS, 0, MOTES)
    }

    if (reduced) {
      draw(41.7) // one static frame, no loop, no listeners
      return () => { ro.disconnect(); gl.getExtension('WEBGL_lose_context')?.loseContext() }
    }

    let raf = 0
    let running = false
    let inView = true
    const start = performance.now()
    const loop = () => {
      draw((performance.now() - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    const sync = () => {
      const should = inView && !document.hidden
      if (should && !running) { running = true; raf = requestAnimationFrame(loop) }
      if (!should && running) { running = false; cancelAnimationFrame(raf) }
    }
    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync() }, { threshold: 0 })
    io.observe(section)
    const onVis = () => sync()
    document.addEventListener('visibilitychange', onVis)
    section.addEventListener('pointermove', onMove, { passive: true })
    section.addEventListener('pointerleave', onLeave, { passive: true })
    sync()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ maskImage: 'linear-gradient(to bottom, black 62%, transparent 96%)', WebkitMaskImage: 'linear-gradient(to bottom, black 62%, transparent 96%)' }}
      aria-hidden="true"
    />
  )
}
