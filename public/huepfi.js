(function(){
  /* ---------- NAV ---------- */
  const nav=document.getElementById('nav');
  if(nav)window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>20));
  const menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
  if(menuBtn&&navLinks){
    menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
  }

  /* ---------- FAQ ---------- */
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q=item.querySelector('.faq-q'),a=item.querySelector('.faq-a');
    if(!q||!a)return;
    q.addEventListener('click',()=>{
      const open=item.classList.toggle('open');
      a.style.maxHeight=open?a.scrollHeight+'px':'0';
    });
  });

  /* ---------- REVEAL ---------- */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* ---------- ROTATING SLOGANS ---------- */
  const slogan=document.getElementById('slogan');
  if(slogan){
    const slogans=[
      'Mehr als Hüpfburgen. Erinnerungen schaffen.',
      'Große Momente beginnen mit Spaß.',
      'Events, über die noch lange gesprochen wird.',
      'Von Kindergeburtstag bis Firmenevent.',
      'Dein Event verdient etwas Besonderes.',
      'Spaß für Familien. Lösungen für Unternehmen.'
    ];
    let si=0;const txt=slogan.querySelector('span');
    setInterval(()=>{
      slogan.classList.add('swap');
      setTimeout(()=>{si=(si+1)%slogans.length;txt.textContent=slogans[si];slogan.classList.remove('swap');},500);
    },4200);
  }

  /* ---------- SLIDESHOW (supports multiple) ---------- */
  document.querySelectorAll('.slideshow').forEach(slideshow=>{
    const slides=slideshow.querySelectorAll('.slide');
    const dotsWrap=slideshow.querySelector('.slide-dots');
    if(!slides.length||!dotsWrap)return;
    let idx=0,timer;
    slides.forEach((_,i)=>{
      const d=document.createElement('button');
      d.className='slide-dot'+(i===0?' active':'');d.setAttribute('aria-label','Slide '+(i+1));
      d.addEventListener('click',()=>go(i,true));
      dotsWrap.appendChild(d);
    });
    const dots=dotsWrap.querySelectorAll('.slide-dot');
    function go(n,manual){
      slides[idx].classList.remove('active');dots[idx].classList.remove('active');
      idx=(n+slides.length)%slides.length;
      slides[idx].classList.add('active');dots[idx].classList.add('active');
      if(manual)reset();
    }
    function reset(){clearInterval(timer);timer=setInterval(()=>go(idx+1),5500);}
    const prev=slideshow.querySelector('.slide-nav.prev');
    const next=slideshow.querySelector('.slide-nav.next');
    if(prev)prev.addEventListener('click',()=>go(idx-1,true));
    if(next)next.addEventListener('click',()=>go(idx+1,true));
    reset();
  });

  /* ---------- CART ---------- */
  const CART_KEY='huepfi_cart';
  const load=()=>{try{return JSON.parse(localStorage.getItem(CART_KEY))||[];}catch(e){return [];}};
  const save=c=>localStorage.setItem(CART_KEY,JSON.stringify(c));
  let cart=load();

  const fabCount=document.querySelectorAll('[data-cart-count]');
  const drawer=document.getElementById('cartDrawer');
  const itemsEl=document.getElementById('cartItems');
  const totalEl=document.getElementById('cartTotal');
  const notesEl=document.getElementById('cartNotes');
  const formSummary=document.getElementById('formCart');

  function renderBadge(){
    const n=cart.reduce((s,i)=>s+i.qty,0);
    fabCount.forEach(el=>{el.textContent=n;el.dataset.empty=n===0?'true':'false';});
  }
  function fmt(n){return n.toLocaleString('de-DE')+' €';}

  function renderDrawer(){
    if(!itemsEl)return;
    if(!cart.length){itemsEl.innerHTML='<div class="cart-empty">Dein Warenkorb ist leer.<br>Wähle Hüpfburgen oder Equipment aus.</div>';totalEl.textContent='0 €';return;}
    itemsEl.innerHTML=cart.map((it,i)=>`
      <div class="cart-item">
        <div>
          <div class="ci-name">${it.name}</div>
          <div class="ci-price">${fmt(it.price)} ${it.unit||'pro WE'}</div>
        </div>
        <div class="ci-qty">
          <button data-act="dec" data-i="${i}" aria-label="weniger">−</button>
          <span>${it.qty}</span>
          <button data-act="inc" data-i="${i}" aria-label="mehr">+</button>
        </div>
        <button class="ci-remove" data-act="rm" data-i="${i}">entfernen</button>
      </div>`).join('');
    const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
    totalEl.textContent=fmt(total);
  }

  function renderFormSummary(){
    if(!formSummary)return;
    if(!cart.length){formSummary.innerHTML='<h4>Dein Warenkorb</h4><p class="form-cart-empty">Noch leer – wähle <a href="/huepfburgen">Hüpfburgen</a> oder <a href="/equipment">Equipment</a>.</p>';return;}
    const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
    formSummary.innerHTML=`<h4><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg> Dein Warenkorb (${cart.reduce((s,i)=>s+i.qty,0)} Pos.)</h4>
      <ul class="fc-list">${cart.map(i=>`<li><span>${i.qty}× <strong>${i.name}</strong></span><span>${fmt(i.price*i.qty)}</span></li>`).join('')}</ul>
      <div class="fc-total"><span>Richtwert gesamt</span><span>${fmt(total)}</span></div>`;
  }

  function render(){renderBadge();renderDrawer();renderFormSummary();}
  render();

  function addItem(p){
    const ex=cart.find(i=>i.id===p.id);
    if(ex)ex.qty+=p.qty||1;else cart.push({...p,qty:p.qty||1});
    save(cart);render();openDrawer();
  }

  /* Add buttons */
  document.querySelectorAll('[data-add-cart]').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.preventDefault();
      const id=btn.dataset.id,name=btn.dataset.name,price=parseFloat(btn.dataset.price)||0,unit=btn.dataset.unit||'';
      addItem({id,name,price,unit});
      const orig=btn.innerHTML;
      btn.classList.add('added');btn.innerHTML='✓ Hinzugefügt';
      setTimeout(()=>{btn.classList.remove('added');btn.innerHTML=orig;},1500);
    });
  });

  /* Drawer controls */
  function openDrawer(){if(drawer){drawer.classList.add('open');document.body.style.overflow='hidden';}}
  function closeDrawer(){if(drawer){drawer.classList.remove('open');document.body.style.overflow='';}}
  document.querySelectorAll('[data-open-cart]').forEach(b=>b.addEventListener('click',openDrawer));
  document.querySelectorAll('[data-close-cart]').forEach(b=>b.addEventListener('click',closeDrawer));

  if(itemsEl){
    itemsEl.addEventListener('click',e=>{
      const b=e.target.closest('button[data-act]');if(!b)return;
      const i=+b.dataset.i,act=b.dataset.act;
      if(act==='inc')cart[i].qty++;
      else if(act==='dec'){cart[i].qty--;if(cart[i].qty<1)cart.splice(i,1);}
      else if(act==='rm')cart.splice(i,1);
      save(cart);render();
    });
  }

  /* Cart → anfrage */
  const toReq=document.getElementById('cartToRequest');
  if(toReq){
    toReq.addEventListener('click',()=>{
      const notes=notesEl?notesEl.value.trim():'';
      if(notes){const msg=document.getElementById('msg');if(msg)msg.value=(msg.value?msg.value+'\n\n':'')+'Anmerkungen zum Warenkorb: '+notes;}
      closeDrawer();
      const k=document.getElementById('kontakt');if(k)k.scrollIntoView({behavior:'smooth'});
    });
  }

  /* ---------- FORM ---------- */
  const form=document.getElementById('contactForm'),success=document.getElementById('formSuccess');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const cartSummary=document.getElementById('cartHidden');
      if(cartSummary)cartSummary.value=cart.length?cart.map(i=>`${i.qty}× ${i.name} (${i.price}€)`).join(' | '):'';
      form.reset();
      if(success){success.hidden=false;success.scrollIntoView({behavior:'smooth',block:'center'});}
      cart=[];save(cart);render();
    });
  }

  const yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
})();