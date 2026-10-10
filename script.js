(function(){
  'use strict';
  var root=document.documentElement, intro=document.getElementById('intro');
  var enter=document.getElementById('intro-enter'), skip=document.getElementById('intro-skip');
  var active=root.classList.contains('intro-pending'), timer=null;
  function closeIntro(){
    if(!active)return; active=false; if(timer)clearTimeout(timer);
    try{sessionStorage.setItem('te-intro','1')}catch(e){}
    root.classList.add('intro-leaving'); root.classList.remove('intro-pending'); document.body.classList.remove('intro-open');
    if(intro){intro.setAttribute('aria-hidden','true');intro.setAttribute('inert','');}
    timer=setTimeout(function(){root.classList.remove('intro-leaving');if(intro)intro.style.display='none';},700);
  }
  if(active&&intro){
    document.body.classList.add('intro-open');
    if(enter)enter.focus({preventScroll:true});
    if(enter)enter.addEventListener('click',closeIntro); if(skip)skip.addEventListener('click',closeIntro);
    document.addEventListener('keydown',function(e){
      if(!active)return; if(e.key==='Escape'){e.preventDefault();closeIntro();}
      if(e.key==='Tab'){var list=[enter,skip].filter(Boolean);if(!list.length)return;var first=list[0],last=list[list.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
    });
    timer=setTimeout(closeIntro,6000);
  }else if(intro){intro.setAttribute('aria-hidden','true');intro.setAttribute('inert','');intro.style.display='none'}
  try{
    if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      root.classList.add('js-ready');var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12});
      document.querySelectorAll('.reveal').forEach(function(el){observer.observe(el)});
    }else{document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('is-visible')})}
  }catch(e){document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('is-visible')})}
})();
