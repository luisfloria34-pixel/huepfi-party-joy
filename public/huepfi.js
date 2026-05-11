(function(){
  const nav=document.getElementById('nav');
  if(nav){window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>20))}

  const menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
  if(menuBtn&&navLinks){
    menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
  }

  document.querySelectorAll('.faq-item').forEach(item=>{
    const q=item.querySelector('.faq-q'),a=item.querySelector('.faq-a');
    if(!q||!a)return;
    q.addEventListener('click',()=>{
      const open=item.classList.toggle('open');
      a.style.maxHeight=open?a.scrollHeight+'px':'0';
    });
  });

  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const form=document.getElementById('contactForm'),success=document.getElementById('formSuccess');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      form.reset();
      if(success){
        success.hidden=false;
        success.scrollIntoView({behavior:'smooth',block:'center'});
      }
    });
  }

  const yr=document.getElementById('yr');
  if(yr)yr.textContent=new Date().getFullYear();
})();