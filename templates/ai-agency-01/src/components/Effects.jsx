import { useEffect, useRef } from 'react'

// Source slug: motion-primitives-in-view
// Author repo: https://github.com/ibelick/motion-primitives
export function RevealController(){useEffect(()=>{const groups=[...document.querySelectorAll('[data-reveal-group]')];const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced||!('IntersectionObserver'in window)){groups.forEach(x=>x.classList.add('is-revealed'));return}const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-revealed');observer.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -5% 0px'});groups.forEach(x=>observer.observe(x));return()=>observer.disconnect()},[]);return null}

// Source slug: motion-primitives-glow-effect
// Author repo: https://github.com/ibelick/motion-primitives
export function PointerGlow(){const ref=useRef(null);useEffect(()=>{const node=ref.current;if(!node||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const move=e=>{node.style.setProperty('--x',`${e.clientX}px`);node.style.setProperty('--y',`${e.clientY}px`)};window.addEventListener('pointermove',move,{passive:true});return()=>window.removeEventListener('pointermove',move)},[]);return <div ref={ref} className="pointer-glow" aria-hidden="true"/>}

// Source slug: animata-moving-gradient
// Author repo: https://github.com/codse/animata
export function Aurora(){return <div className="aurora" aria-hidden="true"><i/><i/><i/></div>}
