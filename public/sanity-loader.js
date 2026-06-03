(function () {
  const config = window.HUEPFI_SANITY_CONFIG || {};
  const ownScript = document.currentScript;
  const nextScript = ownScript?.dataset.nextScript || "/huepfi.js";

  function loadNext() {
    if (!nextScript || window.HUEPFI_NEXT_SCRIPT_LOADED) return;
    window.HUEPFI_NEXT_SCRIPT_LOADED = true;
    const script = document.createElement("script");
    script.src = nextScript;
    script.defer = true;
    document.body.appendChild(script);
  }

  if (!config.projectId) {
    loadNext();
    return;
  }

  const apiHost = config.useCdn ? "apicdn" : "api";
  const imageUrl = `"imageUrl": coalesce(image.asset->url, fallbackImageUrl)`;
  const query = encodeURIComponent(`*[_type == "siteSettings"][0]{
    companyName,
    homepage{
      hero{eyebrow,title,accent,subtitle,lead,${imageUrl}},
      trustItems[]{title,text},
      bounceCastleSection{tag,heading,intro,slides[]{tag,title,text,meta,${imageUrl}}},
      partyRental{tag,heading,intro,pills,${imageUrl}},
      guarantee{heading,intro,footnote,items[]{title,text}},
      targetGroups{tag,heading,intro,items[]{title,text,bullets}},
      inspiration{tag,heading,intro,slides[]{tag,title,text,meta,${imageUrl}}},
      schoolEvent{tag,heading,intro,bullets,${imageUrl}},
      eventPlanning{tag,heading,intro,linkText,linkUrl,tags,tiles[]{title,text}},
      stats[]{number,label},
      reviews{tag,heading,intro,items[]{quote,name,details}},
      certificates[]{title,text},
      process{tag,heading,intro,steps[]{title,text}},
      faq{tag,heading,intro,items[]{question,answer}}
    },
    bounceCastlePage{tag,heading,intro,buttonText,products[]{id,title,description,priceLabel,price,unit,tags,images[]{alt,"imageUrl": coalesce(image.asset->url, fallbackImageUrl)}}},
    equipmentPage{tag,heading,intro,buttonText,products[]{id,title,description,priceLabel,price,unit,tags,images[]{alt,"imageUrl": coalesce(image.asset->url, fallbackImageUrl)}}},
    contact,
    footer,
    seo
  }`);
  const url = `https://${config.projectId}.${apiHost}.sanity.io/v${config.apiVersion}/data/query/${config.dataset}?query=${query}`;

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getValue(path, data) {
    return path.split(".").reduce((value, key) => value && value[key], data);
  }

  function setText(path, data) {
    const value = getValue(path, data);
    if (typeof value !== "string" || !value.trim()) return;
    document.querySelectorAll(`[data-sanity-text="${path}"]`).forEach((node) => {
      node.textContent = value;
    });
  }

  function setHref(path, data) {
    const value = getValue(path, data);
    if (typeof value !== "string" || !value.trim()) return;
    document.querySelectorAll(`[data-sanity-href="${path}"]`).forEach((node) => {
      node.setAttribute("href", value);
    });
  }

  function setImage(path, data) {
    const value = getValue(path, data);
    if (typeof value !== "string" || !value.trim()) return;
    document.querySelectorAll(`[data-sanity-image="${path}"]`).forEach((node) => {
      node.setAttribute("src", value);
    });
  }

  function setHeroTitle(data) {
    const first = getValue("homepage.hero.title", data);
    const accent = getValue("homepage.hero.accent", data);
    const target = document.querySelector("[data-sanity-hero-title]");
    if (!target || typeof first !== "string" || !first.trim()) return;
    target.innerHTML = `${esc(first)} ${accent ? `<span class="accent">${esc(accent)}</span>` : ""}`;
  }

  function setSectionHead(section, data) {
    if (!section) return;
    const tag = section.querySelector(".section-tag");
    const h = section.querySelector("h1,h2");
    const p = section.querySelector(".section-head p, .container > p, .sf-text p, .head p");
    if (tag && data?.tag) tag.textContent = data.tag;
    if (h && data?.heading) h.textContent = data.heading;
    if (p && data?.intro) p.textContent = data.intro;
  }

  function icon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  }

  function renderTrust(items) {
    const grid = document.querySelector(".trust-grid");
    if (!grid || !Array.isArray(items) || !items.length) return;
    grid.innerHTML = items.map((item) => `<div class="trust-card"><div class="trust-icon">${icon()}</div><div><h4>${esc(item.title)}</h4><p>${esc(item.text)}</p></div></div>`).join("");
  }

  function renderSlides(section, data) {
    const slideshow = section?.querySelector(".slideshow");
    const slides = slideshow?.querySelector(".slides");
    if (!slides || !Array.isArray(data?.slides) || !data.slides.length) return;
    slides.innerHTML = data.slides.map((item, index) => `
      <div class="slide${index === 0 ? " active" : ""}">
        <div class="slide-bg" style="background-image:url('${esc(item.imageUrl || "")}')"></div>
        <div class="slide-overlay"></div>
        <div class="slide-content">
          ${item.tag ? `<span class="tag">${esc(item.tag)}</span>` : ""}
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.text)}</p>
          ${Array.isArray(item.meta) ? `<div class="slide-meta">${item.meta.map((meta) => `<span>${esc(meta)}</span>`).join("")}</div>` : ""}
        </div>
      </div>`).join("");
  }

  function renderPartyRental(data) {
    const section = document.querySelector("#partyverleih");
    if (!section || !data) return;
    setSectionHead(section, data);
    const image = section.querySelector(".img-wrap img");
    if (image && data.imageUrl) image.src = data.imageUrl;
    const pills = section.querySelector(".pills");
    if (pills && Array.isArray(data.pills)) pills.innerHTML = data.pills.map((pill) => `<span class="pill">${esc(pill)}</span>`).join("");
  }

  function renderGuarantee(data) {
    const section = document.querySelector(".guarantee");
    if (!section || !data) return;
    const h = section.querySelector(".head h2");
    const p = section.querySelector(".head p");
    const foot = section.querySelector(".g-foot");
    if (h && data.heading) h.textContent = data.heading;
    if (p && data.intro) p.textContent = data.intro;
    if (foot && data.footnote) foot.textContent = data.footnote;
    const grid = section.querySelector(".g-grid");
    if (grid && Array.isArray(data.items) && data.items.length) {
      grid.innerHTML = data.items.map((item) => `<div class="g-card"><div class="g-icon">${icon()}</div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></div>`).join("");
    }
  }

  function renderTargetGroups(data) {
    const section = document.querySelector(".tg-section");
    const grid = section?.querySelector(".tg-grid");
    if (!section || !grid || !data) return;
    setSectionHead(section, data);
    if (Array.isArray(data.items) && data.items.length) {
      grid.innerHTML = data.items.map((item) => `<div class="tg-card"><div class="tg-icon">${icon()}</div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p><ul>${(item.bullets || []).map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul></div>`).join("");
    }
  }

  function renderSchoolEvent(data) {
    const section = document.querySelector(".schulfest");
    if (!section || !data) return;
    setSectionHead(section, data);
    const image = section.querySelector(".sf-img img");
    const list = section.querySelector(".sf-list");
    if (image && data.imageUrl) image.src = data.imageUrl;
    if (list && Array.isArray(data.bullets)) list.innerHTML = data.bullets.map((item) => `<li>${esc(item)}</li>`).join("");
  }

  function renderEventPlanning(data) {
    const section = document.querySelector(".em-band");
    if (!section || !data) return;
    setSectionHead(section, data);
    const tags = section.querySelector(".em-tags");
    const link = section.querySelector(".em-cta");
    const tiles = section.querySelector(".em-visual");
    if (tags && Array.isArray(data.tags)) tags.innerHTML = data.tags.map((tag) => `<span>${esc(tag)}</span>`).join("");
    if (link && data.linkUrl) link.href = data.linkUrl;
    if (link && data.linkText) link.childNodes[0].nodeValue = data.linkText + " ";
    if (tiles && Array.isArray(data.tiles)) tiles.innerHTML = data.tiles.map((tile) => `<div class="em-tile">${icon()}<strong>${esc(tile.title)}</strong><span>${esc(tile.text)}</span></div>`).join("");
  }

  function renderStats(items) {
    const grid = document.querySelector(".stats-grid");
    if (!grid || !Array.isArray(items) || !items.length) return;
    grid.innerHTML = items.map((item) => `<div class="stat"><div class="num">${esc(item.number)}</div><div class="lbl">${esc(item.label)}</div></div>`).join("");
  }

  function renderReviews(data) {
    const section = document.querySelector(".reviews-grid")?.closest("section");
    const grid = section?.querySelector(".reviews-grid");
    if (!section || !grid || !data) return;
    setSectionHead(section, data);
    if (Array.isArray(data.items) && data.items.length) {
      grid.innerHTML = data.items.map((item) => `<div class="review"><div class="stars">★★★★★</div><blockquote>${esc(item.quote)}</blockquote><div class="who"><div class="avatar">${esc((item.name || "K").slice(0, 2).toUpperCase())}</div><div><strong>${esc(item.name)}</strong><small>${esc(item.details)}</small></div></div></div>`).join("");
    }
  }

  function renderCertificates(items) {
    const grid = document.querySelector(".certs");
    if (!grid || !Array.isArray(items) || !items.length) return;
    grid.innerHTML = items.map((item) => `<div class="cert"><div class="ico">${icon()}</div><div><strong>${esc(item.title)}</strong><span>${esc(item.text)}</span></div></div>`).join("");
  }

  function renderProcess(data) {
    const section = document.querySelector(".steps")?.closest("section");
    const grid = section?.querySelector(".steps");
    if (!section || !grid || !data) return;
    setSectionHead(section, data);
    if (Array.isArray(data.steps)) {
      grid.innerHTML = data.steps.map((item, index) => `<div class="step"><div class="step-num">${index + 1}</div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></div>`).join("");
    }
  }

  function renderFaq(data) {
    const section = document.querySelector("#faq");
    const list = section?.querySelector(".faq-list");
    if (!section || !list || !data) return;
    setSectionHead(section, data);
    if (Array.isArray(data.items)) {
      list.innerHTML = data.items.map((item) => `<div class="faq-item"><button class="faq-q">${esc(item.question)}<span class="icon">+</span></button><div class="faq-a"><div class="faq-a-inner">${esc(item.answer)}</div></div></div>`).join("");
    }
  }

  function renderProductPage(data) {
    const hero = document.querySelector(".page-hero");
    const grid = document.querySelector(".cards-grid");
    if (!hero || !grid || !data) return;
    setSectionHead(hero, data);
    const button = hero.querySelector(".btn");
    if (button && data.buttonText) button.textContent = data.buttonText;
    if (!Array.isArray(data.products) || !data.products.length) return;
    grid.innerHTML = data.products.map((product) => {
      const images = Array.isArray(product.images) ? product.images.filter((img) => img.imageUrl) : [];
      return `<article class="card">
        <div class="card-slider">
          <div class="cs-slides">${images.map((img, index) => `<div class="cs-slide${index === 0 ? " active" : ""}"><img src="${esc(img.imageUrl)}" alt="${esc(img.alt || product.title)}" loading="lazy" /></div>`).join("")}</div>
          <button class="cs-prev" aria-label="Zurück">&#8249;</button>
          <button class="cs-next" aria-label="Weiter">&#8250;</button>
          <div class="cs-dots"></div>
        </div>
        <div class="card-body">
          <div class="card-meta">${(product.tags || []).map((tag) => `<span>${esc(tag)}</span>`).join("")}</div>
          <h3>${esc(product.title)}</h3>
          <p>${esc(product.description)}</p>
          <div class="card-rent">${esc(product.priceLabel || "")}</div>
          <button type="button" class="btn btn-cart btn-block" data-add-cart data-id="${esc(product.id?.current || product.title)}" data-name="${esc(product.title)}" data-price="${esc(product.price || 0)}" data-unit="${esc(product.unit || "pro WE")}">+ Zum Warenkorb</button>
        </div>
      </article>`;
    }).join("");
  }

  function renderFooter(data) {
    const footer = document.querySelector(".footer");
    if (!footer || !data) return;
    const text = footer.querySelector(".footer-grid p");
    if (text && data.description) text.textContent = data.description;
  }

  function render(data) {
    setHeroTitle(data);
    [
      "homepage.hero.eyebrow",
      "homepage.hero.subtitle",
      "homepage.hero.lead",
      "contact.heading",
      "contact.intro",
      "contact.phone",
      "contact.phoneNote",
      "contact.email",
      "contact.emailNote",
      "contact.address",
      "contact.openingHours",
    ].forEach((path) => setText(path, data));
    ["contact.phoneHref", "contact.emailHref"].forEach((path) => setHref(path, data));
    setImage("homepage.hero.imageUrl", data);

    const home = data.homepage || {};
    renderTrust(home.trustItems);
    setSectionHead(document.querySelector("#huepfburgen"), home.bounceCastleSection);
    renderSlides(document.querySelector("#huepfburgen"), home.bounceCastleSection);
    renderPartyRental(home.partyRental);
    renderGuarantee(home.guarantee);
    renderTargetGroups(home.targetGroups);
    setSectionHead(document.querySelector("#inspiration"), home.inspiration);
    renderSlides(document.querySelector("#inspiration"), home.inspiration);
    renderSchoolEvent(home.schoolEvent);
    renderEventPlanning(home.eventPlanning);
    renderStats(home.stats);
    renderReviews(home.reviews);
    renderCertificates(home.certificates);
    renderProcess(home.process);
    renderFaq(home.faq);
    renderFooter(data.footer);

    if (location.pathname.includes("equipment")) renderProductPage(data.equipmentPage);
    if (location.pathname.includes("huepfburgen")) renderProductPage(data.bounceCastlePage);
  }

  fetch(url)
    .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    .then(({ result }) => {
      if (result) render(result);
    })
    .catch(() => {})
    .finally(loadNext);
})();
