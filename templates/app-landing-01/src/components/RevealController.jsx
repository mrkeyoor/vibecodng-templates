// Source slug: motion-primitives-in-view
// Author repo: https://github.com/ibelick/motion-primitives
import{useEffect}from'react';export default function RevealController(){useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');o.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('[data-reveal]').forEach(n=>o.observe(n));return()=>o.disconnect()},[]);return null}
