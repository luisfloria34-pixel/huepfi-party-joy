(function () {
  const config = window.HUEPFI_SANITY_CONFIG || {};
  if (!config.projectId) return;

  const apiHost = config.useCdn ? "apicdn" : "api";
  const query = encodeURIComponent(`*[_type == "siteSettings"][0]{
    companyName,
    homepage,
    contact,
    services[]{title, description, imageUrl},
    about,
    seo
  }`);
  const url = `https://${config.projectId}.${apiHost}.sanity.io/v${config.apiVersion}/data/query/${config.dataset}?query=${query}`;

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
    target.innerHTML = "";
    target.append(document.createTextNode(first + " "));
    if (typeof accent === "string" && accent.trim()) {
      const span = document.createElement("span");
      span.className = "accent";
      span.textContent = accent;
      target.append(span);
    }
  }

  fetch(url)
    .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    .then(({ result }) => {
      if (!result) return;
      setHeroTitle(result);
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
      ].forEach((path) => setText(path, result));
      ["contact.phoneHref", "contact.emailHref"].forEach((path) => setHref(path, result));
      setImage("homepage.hero.imageUrl", result);
    })
    .catch(() => {});
})();
