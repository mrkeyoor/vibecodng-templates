import { useEffect } from 'react'
// Source slug: motion-primitives-in-view
// Author repo: https://github.com/ibelick/motion-primitives
export function RevealController(){useEffect(()=>{const groups=[...document.querySelectorAll('[data-reveal-group]')];if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window)){groups.forEach(x=>x.classList.add('is-revealed'));return}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-revealed');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -4% 0px'});groups.forEach(x=>io.observe(x));return()=>io.disconnect()},[]);return null}
