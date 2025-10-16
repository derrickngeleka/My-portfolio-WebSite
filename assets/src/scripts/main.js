// ===== THEME TOGGLE (persist) =====
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
function toggleTheme(){
  const next = root.getAttribute('data-theme') === 'dark' ? '' : 'dark';
  if (next) root.setAttribute('data-theme', next); else root.removeAttribute('data-theme');
  localStorage.setItem('theme', next);
}
themeBtn?.addEventListener('click', toggleTheme);

// ===== NAV (hamburger) =====
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
navToggle?.addEventListener('click', () => navList?.classList.toggle('open'));
navList?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));

// Keep CSS header-height in sync with actual header size so hero content isn't hidden
function updateHeaderHeight(){
  const header = document.querySelector('.header');
  if(!header) return;
  const h = Math.round(header.getBoundingClientRect().height);
  document.documentElement.style.setProperty('--header-height', h + 'px');
}
// run on load and resize
window.addEventListener('load', updateHeaderHeight);
window.addEventListener('resize', updateHeaderHeight);
// when nav toggles (mobile) update after the open/close animation
if(navToggle){
  navToggle.addEventListener('click', ()=> setTimeout(updateHeaderHeight, 150));
}

// ===== Smooth in-page scroll (only if target exists) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',e=>{
    const id = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// ===== Hero parallax + subtle fade =====
const hero = document.querySelector('.hero');
let ticking=false;
function onScroll(){
  if(!hero) return;
  const y = window.scrollY;
  const max = 160;
  const shift = Math.min(y, max);
  hero.style.transform = `translate3d(0, ${shift*0.25}px, 0)`;
  hero.style.opacity = String(1 - Math.min(shift/(max*1.2), 0.25));
}
window.addEventListener('scroll',()=>{
  if(!ticking){ requestAnimationFrame(()=>{ onScroll(); ticking=false; }); ticking=true; }
});
onScroll();

// ===== Typewriter (respect reduced motion) =====
function typeWriter(el,text,speed=35){
  if(!el) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  el.textContent=''; let i=0;
  (function type(){ if(i<text.length){ el.textContent+=text.charAt(i++); setTimeout(type,speed);} })();
}
window.addEventListener('load',()=>{
  const sub = document.querySelector('.hero h2');
  if(sub) typeWriter(sub, sub.dataset.type || sub.textContent);
});

// ===== Contact page copy buttons =====
document.querySelectorAll('.copy-btn').forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    const value = btn.getAttribute('data-copy') || '';
    try{
      await navigator.clipboard.writeText(value);
      const old = btn.textContent; btn.textContent='Copied!'; setTimeout(()=>btn.textContent=old,1100);
    }catch{
      btn.textContent='Press ⌘/Ctrl+C'; setTimeout(()=>btn.textContent='Copy',1200);
    }
  });
});
