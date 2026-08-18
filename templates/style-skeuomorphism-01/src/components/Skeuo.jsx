// Indexed-component adaptations for the Deck template. Each export carries its
// source slug and author repository. All adaptations are dependency-free and
// read the --bw-* palette variables.
import { useId } from 'react'

// Source slug: magicui-noise-texture
// Author repo: https://github.com/magicuidesign/magicui
// Faithful port of the feTurbulence grain; cn() and TypeScript removed. Used
// as the material grain on leather and metal surfaces.
export function NoiseTexture({ className = '', frequency = 0.4, octaves = 6, slope = 0.15, noiseOpacity = 0.6, ...props }) {
  const filterId = useId()
  return (
    <svg
      className={`pointer-events-none absolute inset-0 z-0 size-full select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves={octaves} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope={slope} />
          <feFuncG type="linear" slope={slope} />
          <feFuncB type="linear" slope={slope} />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} opacity={noiseOpacity} />
    </svg>
  )
}

// Source slug: magicui-iphone
// Author repo: https://github.com/magicuidesign/magicui
// The indexed mockup only accepts an image or video src; this adaptation keeps
// the exact frame geometry and screen-punch mask but renders arbitrary React
// children inside the screen so the Deck UI can be live, palette-aware markup.
// Hard-coded grays were mapped onto the material variables.
const PHONE_WIDTH = 433
const PHONE_HEIGHT = 882
const SCREEN_X = 21.25
const SCREEN_Y = 19.25
const SCREEN_WIDTH = 389.5
const SCREEN_HEIGHT = 843.5
const SCREEN_RADIUS = 55.75
const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100
const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100
const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100
const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100
const RADIUS_H = (SCREEN_RADIUS / SCREEN_WIDTH) * 100
const RADIUS_V = (SCREEN_RADIUS / SCREEN_HEIGHT) * 100

export function IphoneFrame({ children, className = '', ...props }) {
  return (
    <div className={`relative inline-block w-full align-middle leading-none ${className}`} style={{ aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}` }} {...props}>
      <div
        className="absolute z-0 overflow-hidden bg-surface"
        style={{
          left: `${LEFT_PCT}%`,
          top: `${TOP_PCT}%`,
          width: `${WIDTH_PCT}%`,
          height: `${HEIGHT_PCT}%`,
          borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
        }}
      >
        {children}
      </div>
      <svg viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`} fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute inset-0 size-full" style={{ transform: 'translateZ(0)' }} aria-hidden="true">
        <g mask="url(#deckScreenPunch)">
          <path d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z" fill="var(--metal-edge)" />
          <path d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z" fill="var(--metal-edge)" />
          <path d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z" fill="var(--metal-edge)" />
          <path d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z" fill="var(--metal-edge)" />
          <path d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z" fill="var(--metal-edge)" />
          <path d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z" fill="var(--metal-lo)" />
        </g>
        <path opacity="0.5" d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z" fill="var(--metal-edge)" />
        <path d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z" fill="color-mix(in srgb, var(--bw-surface) 85%, black)" />
        <path d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z" fill="color-mix(in srgb, var(--bw-surface) 85%, black)" />
        <path d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z" fill="var(--metal-lo)" />
        <defs>
          <mask id="deckScreenPunch" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={PHONE_WIDTH} height={PHONE_HEIGHT} fill="white" />
            <rect x={SCREEN_X} y={SCREEN_Y} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} rx={SCREEN_RADIUS} ry={SCREEN_RADIUS} fill="black" />
          </mask>
        </defs>
      </svg>
    </div>
  )
}

// Source slug: 8bitcn-progress
// Author repo: https://github.com/TheOrcDev/8bitcn-ui
// The indexed retro variant renders twenty discrete squares inside chunky
// offset borders. This adaptation keeps that segment logic and frame but drops
// Radix and cva, restyles segments as amber LEDs, and gives the progressbar an
// accessible name (the indexed harness run recorded a serious
// aria-progressbar-name finding).
export function LedMeter({ value = 0, label = 'Progress', className = '' }) {
  const segments = 20
  const filled = Math.round((value / 100) * segments)
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative h-4 w-full overflow-hidden rounded-[3px] bg-black/60 p-[3px] shadow-[inset_0_2px_4px_rgb(0_0_0/0.8)]" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <div className="flex h-full w-full gap-[2px]">
          {Array.from({ length: segments }).map((_, index) => (
            <span
              key={index}
              className={`h-full flex-1 rounded-[1px] ${index < filled ? 'led-cell bg-accent shadow-[0_0_5px_var(--bw-accent)]' : 'bg-(--led-off)'}`}
              style={index < filled ? { '--led-order': index } : undefined}
            />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -my-1 rounded-[3px] border-y-4 border-(--metal-edge)" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -mx-1 rounded-[3px] border-x-4 border-(--metal-edge)" aria-hidden="true" />
    </div>
  )
}

// Source slug: 8bitcn-kbd
// Author repo: https://github.com/TheOrcDev/8bitcn-ui
// Keeps the indexed kbd/kbd-group structure and sizing; the Press Start 2P
// import is replaced by the faceplate display stack, and the flat fill becomes
// a machined key cap so it reads as hardware rather than pixels.
export function Kbd({ className = '', ...props }) {
  return (
    <kbd
      className={`pointer-events-none inline-flex h-6 w-fit min-w-6 select-none items-center justify-center gap-1 rounded-[5px] border border-(--metal-edge) bg-linear-to-b from-(--metal-hi) to-(--metal-lo) px-1.5 font-display text-xs tracking-[0.08em] text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_2px_0_rgb(0_0_0/0.6)] ${className}`}
      {...props}
    />
  )
}

export function KbdGroup({ className = '', ...props }) {
  return <kbd className={`inline-flex items-center gap-1 ${className}`} {...props} />
}
