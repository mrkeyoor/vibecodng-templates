// First-party signature hero: a WebGL2 signal-wave field. Eight glowing
// waveform ribbons flow across a shallow 3D depth stack (nearer ribbons are
// larger, brighter and faster), each a sum of sines plus value noise so the
// motion reads as live telemetry rather than a screensaver. The pointer
// swells ribbon amplitude around the cursor like a hand passed over
// strings; a faint spectrum-bar floor adds the audio-analyzer feel.
// Colors derive from --bw-accent (plus hue rotations) so palettes re-key
// the field. Loaded lazily; the CSS aurora blobs are the no-WebGL fallback.

import { useEffect, useRef } from 'react'
import { createShaderScene, paletteColor, rotateHue } from './shader-runtime.js'

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uActive;
uniform vec3 uSurface;
uniform vec3 uAccent;
uniform vec3 uCyan;
uniform vec3 uPink;
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

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5) * 2.0; // y up, center 0

  float t = uTime * 0.55;
  float px = (uPointer.x - 0.5) * aspect * 2.0;

  vec3 col = uSurface * 0.55;

  // Depth-stacked waveform ribbons.
  for(int i = 0; i < 8; i++){
    float fi = float(i);
    float z = 1.0 + fi * 0.42;                    // pseudo-depth
    float dir = mix(1.0, -1.0, mod(fi, 2.0));     // alternate flow
    float x = p.x * (0.9 + 0.18 * z) + fi * 7.31;

    float wave =
        sin(x * 1.7 + dir * t * (0.55 + 0.09 * fi)) * 0.45
      + sin(x * 3.3 - dir * t * 0.8 + fi * 1.7) * 0.22
      + (noise(vec2(x * 0.75 + dir * t * 0.35, fi * 3.7)) - 0.5) * 1.1;

    // Pointer swell: amplitude rises near the cursor column.
    float swell = 1.0 + 1.7 * uActive * exp(-2.8 * (p.x - px) * (p.x - px));
    float amp = (0.30 / z) * swell;

    // Ribbons sweep the full hero, nearer rows lower, farther rows higher.
    float yc = 0.06 + (fi - 3.5) * (0.52 / z) + wave * amp;
    float d = abs(p.y - yc);

    float core = 0.0012 / (d * d + 0.0012);       // hot line
    float halo = 0.010 / (d + 0.010);             // soft glow

    float sel = fract(fi * 0.37);
    vec3 rc = sel < 0.34 ? uAccent : (sel < 0.67 ? uCyan : uPink);
    float depthFade = 1.35 / z;
    col += rc * (core * 1.05 + halo * 0.09) * depthFade;
  }

  // Spectrum floor: quantized bars breathing along the bottom edge.
  float bx = floor((p.x + aspect) * 22.0);
  float bh = pow(noise(vec2(bx * 0.53, t * 0.6)), 2.0) * 0.34;
  float inBar = step(p.y, -0.62 + bh) * step(-0.98, p.y);
  float barGap = step(fract((p.x + aspect) * 22.0), 0.82);
  col += mix(uAccent, uCyan, fract(bx * 0.618)) * inBar * barGap * 0.05;

  // Center scrim so the headline stays the loudest thing on screen.
  vec2 sd = (uv - vec2(0.5, 0.60)) / vec2(0.40, 0.46);
  col = mix(col, uSurface * 0.55, 0.42 * exp(-dot(sd, sd) * 1.5));

  // Edge vignette and bottom hand-off to the page.
  col = mix(uSurface, col, smoothstep(0.0, 0.22, uv.y));
  col *= 1.0 - 0.30 * smoothstep(0.75, 1.35, length(p * vec2(0.75, 1.0)));

  // Grain against banding.
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.015;

  fragColor = vec4(col, 1.0);
}`

export default function SignalShader() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    let destroy
    try {
      destroy = createShaderScene(canvas, {
        frag: FRAG,
        staticTime: 14,
        resScale: 0.6,   // glow field: reduced-res render, CSS upscales
        maxDim: 1600,
        pointerEl: canvas.closest('.hero') || canvas.parentElement,
        colors: () => {
          const accent = paletteColor('--bw-accent', [0.545, 0.361, 0.965])
          return {
            uSurface: paletteColor('--bw-surface', [0.027, 0.023, 0.066]),
            uAccent: accent,
            uCyan: rotateHue(accent, -85),
            uPink: rotateHue(accent, 65),
          }
        },
      })
    } catch {
      canvas.style.display = 'none'
    }
    return () => destroy?.()
  }, [])

  return <canvas ref={ref} className="signal-canvas" aria-hidden="true" />
}
