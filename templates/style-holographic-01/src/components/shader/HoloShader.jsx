// First-party signature hero: real thin-film interference foil.
// A WebGL2 fragment shader models a foil card with brushed micro-normals,
// etched rings and diffraction gratings. Pointer position tilts the card's
// light angle; the interference term (cosine of optical path difference at
// three wavelengths) produces the angle-dependent oil-on-water rainbow.
// Loaded lazily; the CSS conic foil beneath is the no-WebGL fallback.

import { useEffect, useRef } from 'react'
import { createShaderScene, paletteColor } from './shader-runtime.js'

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;   // 0..1, lerped
uniform float uActive;   // pointer presence 0..1
uniform vec3 uAccent;
uniform vec3 uSurface;
out vec4 fragColor;

float hash(vec2 p){
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i = 0; i < 4; i++){
    v += a * noise(p);
    p = p * 2.03 + vec2(11.7, 5.3);
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  // Tilt: pointer drives it; a slow orbit keeps the foil alive when idle.
  vec2 idle = 0.35 * vec2(cos(uTime * 0.24), sin(uTime * 0.17));
  vec2 tilt = mix(idle, (uPointer - 0.5) * 2.0, uActive);

  // Card surface normal: gentle curvature + brushed micro-grain +
  // etched holo pattern (concentric rings and two diagonal gratings).
  float micro = fbm(p * 18.0);
  vec2 ringC = vec2(0.22 * tilt.x, 0.16 * tilt.y);
  float rings = sin(length(p - ringC) * 34.0 - uTime * 0.25);
  float gratA = sin(dot(p, normalize(vec2(1.0, 0.38))) * 150.0);
  vec3 n = normalize(vec3(
    p.x * 0.28 + tilt.x * 0.60 + (micro - 0.5) * 0.10 + rings * 0.030 + gratA * 0.016,
    p.y * 0.28 + tilt.y * 0.60 + (micro - 0.5) * 0.10 + gratA * 0.012,
    1.0));

  float cosT = clamp(dot(n, vec3(0.0, 0.0, 1.0)), 0.0, 1.0);

  // Thin-film interference: optical path difference varies with film
  // thickness (a broad, slowly-flowing fbm field) and the view angle.
  // Low spatial frequency keeps the bands wide, like real oil on water.
  float flow = fbm(p * 1.55 + tilt * 0.55 + vec2(uTime * 0.045, -uTime * 0.03));
  float thickness = 1.9 + 0.6 * flow + 0.10 * sin(uTime * 0.21);
  float opd = thickness * cosT;
  vec3 freq = vec3(5.8, 7.0, 8.6); // inverse wavelengths, R < G < B
  vec3 irid = 0.5 + 0.5 * cos(6.2831853 * opd * freq + vec3(0.0, 1.15, 2.4));

  // Pastel metal: lift toward white so the dark ink art stays >7:1.
  vec3 col = mix(irid, vec3(1.0), 0.40);

  // Specular sheen band following the light.
  vec3 l = normalize(vec3(tilt * 0.9, 1.0));
  float sheen = pow(clamp(dot(n, l), 0.0, 1.0), 28.0);
  col += sheen * 0.12;

  // Foil glints: sparse pixel glitter that twinkles as the card tilts.
  float cell = hash(floor(p * 150.0) + floor(tilt * 6.0));
  float sparkle = smoothstep(0.994, 1.0, cell)
    * (0.55 + 0.45 * sin(uTime * 3.0 + cell * 80.0));
  col += sparkle * 0.45;

  // Palette pull so a swapped --bw-accent re-keys the foil family.
  col = mix(col, col * (0.55 + 0.9 * uAccent), 0.30);

  // Soft edge falloff toward the panel rim.
  float edge = smoothstep(0.62, 1.05, length(p));
  col = mix(col, mix(col, uSurface, 0.55), edge * 0.35);

  // Ordered-ish dither to avoid banding on the smooth ramps.
  col += (hash(gl_FragCoord.xy * 0.7) - 0.5) * 0.012;

  fragColor = vec4(col, 1.0);
}`

export default function HoloShader() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    let destroy
    try {
      destroy = createShaderScene(canvas, {
        frag: FRAG,
        staticTime: 7.4,
        pointerEl: canvas.closest('.hero') || canvas.parentElement,
        colors: () => ({
          uAccent: paletteColor('--bw-accent', [0.68, 0.71, 1.0]),
          uSurface: paletteColor('--bw-surface', [0.043, 0.043, 0.07]),
        }),
      })
    } catch {
      // Compile/context failure: stay invisible, CSS foil shows through.
      canvas.style.display = 'none'
    }
    return () => destroy?.()
  }, [])

  return <canvas ref={ref} className="holo-canvas" aria-hidden="true" />
}
