// Signature hero visual: real liquid-metal / chrome WebGL2 shader, restored.
// Fragment shader adapted from @paper-design/shaders "LiquidMetal" (MIT,
// https://github.com/paper-design/shaders) — the same shader the original
// cult-ui hero-liquid-metal used — reduced to the full-fill canvas variant
// with the original defaults (repetition 6, softness .8, shiftRed 1,
// shiftBlue -1, distortion .4, contour .4) plus a first-party
// pointer-reactive ripple that bends the chrome bands around the cursor.
// Perf contract: DPR capped at 2, rAF paused off-viewport and on
// document.hidden, prefers-reduced-motion renders one static frame,
// and a missing WebGL2 context leaves the CSS chrome fallback visible.
import { useEffect, useRef } from 'react'

const VERT = /* glsl */ `#version 300 es
precision highp float;
out vec2 v_uv;
void main() {
  // fullscreen triangle
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  v_uv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`

const FRAG = /* glsl */ `#version 300 es
precision highp float;
uniform vec2  u_resolution; // CSS px
uniform float u_time;
uniform vec2  u_pointer;    // CSS px
uniform float u_active;
out vec4 fragColor;
in vec2 v_uv;

#define PI 3.14159265358979323846

const float u_repetition = 6.0;
const float u_softness   = 0.8;
const float u_shiftRed   = 0.5;  // calmer dispersion than the cult-ui default (1.0)
const float u_shiftBlue  = -0.5; // keeps the chrome silver-blue for Meridian's light UI
const float u_distortion = 0.4;
const float u_contour    = 0.4;
const vec4  u_colorTint  = vec4(0.20, 0.38, 0.62, 0.85); // Meridian steel-blue

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float getColorChanges(float c1, float c2, float stripe_p, vec3 w, float blur, float bump, float tint) {
  float ch = mix(c2, c1, smoothstep(.0, 2. * blur, stripe_p));
  float border = w[0];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));
  border = w[0] + .4 * (1. - bump) * w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));
  border = w[0] + .5 * (1. - bump) * w[1];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));
  border = w[0] + w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));
  float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
  float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
  ch = mix(ch, gradient, smoothstep(border, border + .5 * blur, stripe_p));
  // tint applied with color-burn blending (as in the original)
  ch = mix(ch, 1. - min(1., (1. - ch) / max(tint, 0.0001)), u_colorTint.a);
  return ch;
}

void main() {
  const float firstFrameOffset = 2.8;
  float t = .3 * (u_time + firstFrameOffset);

  float ratio = u_resolution.x / max(u_resolution.y, 1.0);

  // full-fill edge mask (original u_shape < 1 branch)
  vec2 borderUV = v_uv;
  vec2 maskv = min(borderUV, 1. - borderUV);
  vec2 pixel_thickness = min(250. / u_resolution, vec2(.5));
  float maskX = pow(smoothstep(0.0, pixel_thickness.x, maskv.x), .25);
  float maskY = pow(smoothstep(0.0, pixel_thickness.y, maskv.y), .25);
  float edge = clamp(1. - maskX * maskY, 0., 1.);

  // aspect-corrected working uv
  vec2 uv = v_uv - .5;
  if (ratio > 1.) { uv.y /= ratio; } else { uv.x *= ratio; }
  uv += .5;
  uv.y = 1. - uv.y;

  // first-party pointer ripple: bends the chrome around the cursor
  vec2 p = u_pointer / max(u_resolution, vec2(1.0));
  if (ratio > 1.) { p.y = (p.y - .5) / ratio + .5; } else { p.x = (p.x - .5) * ratio + .5; }
  float pd = distance(vec2(uv.x, 1. - uv.y), p);
  float rip = u_active * exp(-4.5 * pd);
  uv += normalize(vec2(uv.x, 1. - uv.y) - p + 1e-4) * 0.014 * rip * sin(26.0 * pd - u_time * 4.0);

  float cycleWidth = u_repetition * 2.;

  vec2 rotatedUV = uv - vec2(.5);
  float angle = 70. * PI / 180.;
  rotatedUV = vec2(
    rotatedUV.x * cos(angle) - rotatedUV.y * sin(angle),
    rotatedUV.x * sin(angle) + rotatedUV.y * cos(angle)
  ) + vec2(.5);

  edge = mix(smoothstep(.9 - 2. * fwidth(edge), .9, edge), edge, smoothstep(0.0, 0.4, u_contour));
  float opacity = 1.; // panel is opaque; CSS fallback sits behind the canvas
  edge = 1.2 * edge;  // original full-fill boost

  float diagBLtoTR = rotatedUV.x - rotatedUV.y;
  float diagTLtoBR = rotatedUV.x + rotatedUV.y;

  vec3 color1 = vec3(.98, .98, 1.);
  vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, diagTLtoBR));

  vec2 grad_uv = uv - .5;
  float dist = length(grad_uv + vec2(0., .2 * diagBLtoTR));
  grad_uv = rotate(grad_uv, (.25 - .2 * diagBLtoTR) * PI);
  float direction = grad_uv.x;

  float bump = pow(1.8 * dist, 1.2);
  bump = 1. - bump;
  bump *= pow(uv.y, .3);

  float thin_strip_1_ratio = .12 / cycleWidth * (1. - .4 * bump);
  float thin_strip_2_ratio = .07 / cycleWidth * (1. + .4 * bump);
  float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);
  float thin_strip_1_width = cycleWidth * thin_strip_1_ratio;
  float thin_strip_2_width = cycleWidth * thin_strip_2_ratio;

  float noise = snoise(uv - t);
  edge += (1. - edge) * u_distortion * noise;

  direction += diagBLtoTR;
  direction -= 2. * noise * diagBLtoTR * (smoothstep(0., 1., edge) * (1.0 - smoothstep(0., 1., edge)));
  direction *= mix(1., 1. - edge, smoothstep(.5, 1., u_contour));
  direction -= 1.7 * edge * smoothstep(.5, 1., u_contour);
  direction += .2 * pow(u_contour, 4.) * (1.0 - smoothstep(0., 1., edge));

  bump *= clamp(pow(uv.y, .1), .3, 1.);
  direction *= (.1 + (1.1 - edge) * bump);
  direction *= (.4 + .6 * (1.0 - smoothstep(.5, 1., edge)));
  direction += .18 * (smoothstep(.1, .2, uv.y) * (1.0 - smoothstep(.2, .4, uv.y)));
  direction += .03 * (smoothstep(.1, .2, 1. - uv.y) * (1.0 - smoothstep(.2, .4, 1. - uv.y)));
  direction *= (.5 + .5 * pow(uv.y, 2.));
  direction *= cycleWidth;
  direction -= t;
  // pointer ripple also shears the band phase locally
  direction += .35 * rip * sin(18.0 * pd - u_time * 5.0);

  float colorDispersion = clamp(1. - bump, 0., 1.);
  float dispersionRed = colorDispersion;
  dispersionRed += .03 * bump * noise;
  dispersionRed += 5. * (smoothstep(-.1, .2, uv.y) * (1.0 - smoothstep(.1, .5, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, 1., bump)));
  dispersionRed -= diagBLtoTR;
  float dispersionBlue = colorDispersion * 1.3;
  dispersionBlue += (smoothstep(0., .4, uv.y) * (1.0 - smoothstep(.1, .8, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, .8, bump)));
  dispersionBlue -= .2 * edge;
  dispersionRed *= (u_shiftRed / 20.);
  dispersionBlue *= (u_shiftBlue / 20.);

  float blur = u_softness / 15.;

  vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
  w[1] -= .02 * smoothstep(.0, 1., edge + bump);
  float stripe_r = fract(direction + dispersionRed);
  float r = getColorChanges(color1.r, color2.r, stripe_r, w, blur + fwidth(stripe_r), bump, u_colorTint.r);
  float stripe_g = fract(direction);
  float g = getColorChanges(color1.g, color2.g, stripe_g, w, blur + fwidth(stripe_g), bump, u_colorTint.g);
  float stripe_b = fract(direction - dispersionBlue);
  float b = getColorChanges(color1.b, color2.b, stripe_b, w, blur + fwidth(stripe_b), bump, u_colorTint.b);

  vec3 color = vec3(r, g, b) * opacity;

  // subtle grain, as in the original
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);

  fragColor = vec4(color, opacity);
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

export default function LiquidMetal() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = canvas?.parentElement
    if (!canvas || !stage) return undefined
    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!gl) return undefined // CSS chrome fallback stays visible

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

    const uRes = gl.getUniformLocation(prog, 'u_resolution')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uPointer = gl.getUniformLocation(prog, 'u_pointer')
    const uActive = gl.getUniformLocation(prog, 'u_active')

    let w = 0
    let h = 0
    const resize = () => {
      const rect = stage.getBoundingClientRect()
      w = Math.max(rect.width, 1)
      h = Math.max(rect.height, 1)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(stage)

    const pointer = { x: -600, y: -600, tx: -600, ty: -600, active: 0, tActive: 0 }
    const onMove = (event) => {
      const rect = stage.getBoundingClientRect()
      pointer.tx = event.clientX - rect.left
      pointer.ty = event.clientY - rect.top
      pointer.tActive = 1
    }
    const onLeave = () => { pointer.tActive = 0 }

    const draw = (t) => {
      pointer.x += (pointer.tx - pointer.x) * 0.1
      pointer.y += (pointer.ty - pointer.y) * 0.1
      pointer.active += (pointer.tActive - pointer.active) * 0.06
      gl.uniform2f(uRes, w, h)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uPointer, pointer.x, pointer.y)
      gl.uniform1f(uActive, pointer.active)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    if (reduced) {
      draw(0) // one static frame — matches the original's first frame
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
    io.observe(stage)
    const onVis = () => sync()
    document.addEventListener('visibilitychange', onVis)
    stage.addEventListener('pointermove', onMove, { passive: true })
    stage.addEventListener('pointerleave', onLeave, { passive: true })
    sync()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
