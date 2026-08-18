import { useEffect } from 'react'
// Source slug: motion-primitives-in-view
// Author repo: https://github.com/ibelick/motion-primitives
export function RevealController(){useEffect(()=>{const all=[...document.querySelectorAll('[data-reveal-group]')];if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window)){all.forEach(x=>x.classList.add('is-revealed'));return}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-revealed');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});all.forEach(x=>io.observe(x));return()=>io.disconnect()},[]);return null}
