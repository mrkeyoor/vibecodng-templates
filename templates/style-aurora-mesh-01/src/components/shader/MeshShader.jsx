// First-party signature hero: real animated mesh-gradient field.
// A WebGL2 fragment shader runs domain-warped simplex-noise fbm — the flow
// field warps itself twice (q, then r), and the warped coordinates blend
// four palette-derived colors into a slow, hypnotic aurora. The pointer
// gently bulges the field. Colors come from --bw-accent (plus the same
// +75 / -105 hue rotations the CSS layer uses) so palettes re-key the mesh.
// Loaded lazily; the CSS blob field beneath is the no-WebGL fallback.

import { useEffect, useRef } from 'react'
import { createShaderScene, paletteColor, rotateHue } from './shader-runtime.js'

// Push a color away from its gray axis so hue-rotated palette derivatives
// stay luminous in the field instead of averaging into mud.
function vivid([r, g, b], amount = 0.35) {
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
  const push = (c) => Math.min(1, Math.max(0, l + (c - l) * (1 + amount)))
  return [push(r), push(g), push(b)]
}

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uActive;
uniform vec3 uSurface;
uniform vec3 uAccent;
uniform vec3 uRose;
uniform vec3 uTeal;
out vec4 fragColor;

// 2D simplex noise (Ashima / IQ public-domain construction).
vec3 permute(vec3 x){ return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
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
float fbm(vec2 p){
  float v = 0.0, a = 0.55;
  for(int i = 0; i < 3; i++){
    v += a * snoise(p);
    p = p * 2.02 + vec2(7.3, 3.1);
    a *= 0.5;
  }
  return v * 0.5 + 0.5;
}
float hash(vec2 p){
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;         // y up
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 0.80;

  // Pointer: a soft bulge that bends the field around the cursor.
  vec2 pm = vec2(uPointer.x * aspect, uPointer.y) * 0.80;
  vec2 dp = p - pm;
  p += dp * (-0.35 * uActive * exp(-8.0 * dot(dp, dp)));

  float t = uTime * 0.030;

  // Domain warping: q warps the space, r warps it again.
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(3.1, 7.3) - t * 0.7));
  vec2 r = vec2(fbm(p + 1.9 * q + vec2(1.7, 9.2) + 0.30 * t),
                fbm(p + 1.9 * q + vec2(8.3, 2.8) - 0.24 * t));
  float f = fbm(p + 1.7 * r);

  // Luminous pools over the dark surface: sharp masks keep the colors
  // saturated instead of averaging into mud.
  vec3 col = uSurface;
  float m1 = smoothstep(0.42, 0.80, f);
  float m2 = smoothstep(0.48, 0.85, q.y);
  float m3 = smoothstep(0.50, 0.88, r.x);
  col = mix(col, uAccent, 0.85 * m1);
  col = mix(col, uRose,   0.80 * m2 * (0.35 + 0.65 * m1));
  col = mix(col, uTeal,   0.65 * m3 * (1.0 - 0.5 * m2));
  // Bloom in the hottest folds.
  col += uAccent * 0.40 * pow(max(f, 0.0), 3.5);
  col += uRose * 0.22 * pow(max(q.y, 0.0), 4.0);
  // Bright seams where the warp folds over itself.
  float seam = smoothstep(0.68, 0.98, f * q.x);
  col = mix(col, mix(uAccent, vec3(1.0), 0.45), 0.35 * seam);

  // Readability scrim: dim the field behind the centered headline column.
  vec2 d = (uv - vec2(0.5, 0.62)) / vec2(0.42, 0.50);
  float scrim = 1.0 - 0.42 * exp(-dot(d, d) * 1.6);
  col = mix(uSurface, col, scrim);

  // Fade to the page surface at the bottom so the hero hands off cleanly.
  col = mix(uSurface, col, smoothstep(0.0, 0.34, uv.y));

  // Fine grain kills banding on the slow ramps.
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.016;

  fragColor = vec4(col, 1.0);
}`

export default function MeshShader() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    let destroy
    try {
      destroy = createShaderScene(canvas, {
        frag: FRAG,
        staticTime: 26,
        resScale: 0.5,   // soft field: half-res render, CSS upscales
        maxDim: 1280,
        pointerEl: canvas.closest('section') || canvas.parentElement,
        colors: () => {
          const accent = paletteColor('--bw-accent', [0.69, 0.55, 1.0])
          return {
            uSurface: paletteColor('--bw-surface', [0.055, 0.039, 0.094]),
            uAccent: accent,
            uRose: vivid(rotateHue(accent, 75)),
            uTeal: vivid(rotateHue(accent, -105)),
          }
        },
      })
    } catch {
      canvas.style.display = 'none' // CSS blob field beneath is the fallback
    }
    return () => destroy?.()
  }, [])

  return <canvas ref={ref} className="mesh-canvas" aria-hidden="true" />
}
