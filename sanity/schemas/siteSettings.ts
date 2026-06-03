import {defineField, defineType} from "sanity";

const imageFields = [
  defineField({name: "image", title: "Bild hochladen", type: "image", options: {hotspot: true}}),
  defineField({
    name: "fallbackImageUrl",
    title: "Bild URL",
    type: "url",
    description: "Optional: bestehendes Website-Bild oder externe Bildadresse.",
  }),
];

const sectionIntroFields = [
  defineField({name: "tag", title: "Kleine Überschrift", type: "string"}),
  defineField({name: "heading", title: "Überschrift", type: "string"}),
  defineField({name: "intro", title: "Einleitung", type: "text"}),
];

const contentCard = {
  type: "object",
  fields: [
    defineField({name: "title", title: "Titel", type: "string"}),
    defineField({name: "text", title: "Text", type: "text"}),
  ],
};

const productCard = {
  type: "object",
  fields: [
    defineField({name: "id", title: "Warenkorb ID", type: "slug"}),
    defineField({name: "title", title: "Titel", type: "string"}),
    defineField({name: "description", title: "Beschreibung", type: "text"}),
    defineField({name: "priceLabel", title: "Preisanzeige", type: "string"}),
    defineField({name: "price", title: "Preis Zahl", type: "number"}),
    defineField({name: "unit", title: "Einheit", type: "string"}),
    defineField({name: "tags", title: "Badges", type: "array", of: [{type: "string"}]}),
    defineField({
      name: "images",
      title: "Bilder",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            ...imageFields,
            defineField({name: "alt", title: "Alt Text", type: "string"}),
          ],
        },
      ],
    }),
  ],
};

const slideCard = {
  type: "object",
  fields: [
    defineField({name: "tag", title: "Kategorie", type: "string"}),
    defineField({name: "title", title: "Titel", type: "string"}),
    defineField({name: "text", title: "Text", type: "text"}),
    defineField({name: "meta", title: "Meta Infos", type: "array", of: [{type: "string"}]}),
    ...imageFields,
  ],
};

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website Inhalte",
  type: "document",
  fields: [
    defineField({name: "companyName", title: "Firmenname", type: "string"}),
    defineField({
      name: "homepage",
      title: "Startseite",
      type: "object",
      fields: [
        defineField({
          name: "hero",
          title: "Hero Bereich",
          type: "object",
          fields: [
            defineField({name: "eyebrow", title: "Region / Badge", type: "string"}),
            defineField({name: "title", title: "Überschrift", type: "string"}),
            defineField({name: "accent", title: "Orange Hervorhebung", type: "string"}),
            defineField({name: "subtitle", title: "Unterüberschrift", type: "string"}),
            defineField({name: "lead", title: "Beschreibung", type: "text"}),
            ...imageFields,
          ],
        }),
        defineField({name: "trustItems", title: "Vorteile", type: "array", of: [contentCard]}),
        defineField({
          name: "bounceCastleSection",
          title: "Hüpfburgen Startseite",
          type: "object",
          fields: [
            ...sectionIntroFields,
            defineField({name: "slides", title: "Slides", type: "array", of: [slideCard]}),
          ],
        }),
        defineField({
          name: "partyRental",
          title: "Partyverleih",
          type: "object",
          fields: [
            ...sectionIntroFields,
            defineField({name: "pills", title: "Equipment Tags", type: "array", of: [{type: "string"}]}),
            ...imageFields,
          ],
        }),
        defineField({
          name: "guarantee",
          title: "Garantien",
          type: "object",
          fields: [
            defineField({name: "heading", title: "Überschrift", type: "string"}),
            defineField({name: "intro", title: "Einleitung", type: "text"}),
            defineField({name: "items", title: "Karten", type: "array", of: [contentCard]}),
            defineField({name: "footnote", title: "Fußzeile", type: "string"}),
          ],
        }),
        defineField({
          name: "targetGroups",
          title: "Zielgruppen",
          type: "object",
          fields: [
            ...sectionIntroFields,
            defineField({
              name: "items",
              title: "Karten",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({name: "title", title: "Titel", type: "string"}),
                    defineField({name: "text", title: "Text", type: "text"}),
                    defineField({name: "bullets", title: "Punkte", type: "array", of: [{type: "string"}]}),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: "inspiration",
          title: "Inspiration",
          type: "object",
          fields: [
            ...sectionIntroFields,
            defineField({name: "slides", title: "Slides", type: "array", of: [slideCard]}),
          ],
        }),
        defineField({
          name: "schoolEvent",
          title: "Schulfest",
          type: "object",
          fields: [
            ...sectionIntroFields,
            defineField({name: "bullets", title: "Punkte", type: "array", of: [{type: "string"}]}),
            ...imageFields,
          ],
        }),
        defineField({
          name: "eventPlanning",
          title: "Eventmanufaktur Band",
          type: "object",
          fields: [
            ...sectionIntroFields,
            defineField({name: "linkText", title: "Button Text", type: "string"}),
            defineField({name: "linkUrl", title: "Button Link", type: "url"}),
            defineField({name: "tags", title: "Tags", type: "array", of: [{type: "string"}]}),
            defineField({name: "tiles", title: "Kacheln", type: "array", of: [contentCard]}),
          ],
        }),
        defineField({
          name: "stats",
          title: "Zahlen",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({name: "number", title: "Zahl", type: "string"}),
                defineField({name: "label", title: "Text", type: "string"}),
              ],
            },
          ],
        }),
        defineField({
          name: "reviews",
          title: "Bewertungen",
          type: "object",
          fields: [
            ...sectionIntroFields,
            defineField({
              name: "items",
              title: "Bewertungen",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({name: "quote", title: "Bewertung", type: "text"}),
                    defineField({name: "name", title: "Name", type: "string"}),
                    defineField({name: "details", title: "Details", type: "string"}),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({name: "certificates", title: "Zertifikate", type: "array", of: [contentCard]}),
        defineField({
          name: "process",
          title: "Ablauf",
          type: "object",
          fields: [
            ...sectionIntroFields,
            defineField({name: "steps", title: "Schritte", type: "array", of: [contentCard]}),
          ],
        }),
        defineField({
          name: "faq",
          title: "FAQ",
          type: "object",
          fields: [
            ...sectionIntroFields,
            defineField({
              name: "items",
              title: "Fragen",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({name: "question", title: "Frage", type: "string"}),
                    defineField({name: "answer", title: "Antwort", type: "text"}),
                  ],
                },
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "bounceCastlePage",
      title: "Unterseite Hüpfburgen",
      type: "object",
      fields: [
        ...sectionIntroFields,
        defineField({name: "buttonText", title: "Button Text", type: "string"}),
        defineField({name: "products", title: "Produkte", type: "array", of: [productCard]}),
      ],
    }),
    defineField({
      name: "equipmentPage",
      title: "Unterseite Equipment",
      type: "object",
      fields: [
        ...sectionIntroFields,
        defineField({name: "buttonText", title: "Button Text", type: "string"}),
        defineField({name: "products", title: "Produkte", type: "array", of: [productCard]}),
      ],
    }),
    defineField({
      name: "contact",
      title: "Kontakt",
      type: "object",
      fields: [
        defineField({name: "heading", title: "Überschrift", type: "string"}),
        defineField({name: "intro", title: "Einleitung", type: "text"}),
        defineField({name: "phone", title: "Telefon", type: "string"}),
        defineField({name: "phoneHref", title: "Telefon-Link", type: "string"}),
        defineField({name: "phoneNote", title: "Telefon-Hinweis", type: "string"}),
        defineField({name: "email", title: "E-Mail", type: "string"}),
        defineField({name: "emailHref", title: "E-Mail-Link", type: "string"}),
        defineField({name: "emailNote", title: "E-Mail-Hinweis", type: "string"}),
        defineField({name: "address", title: "Adresse", type: "string"}),
        defineField({name: "openingHours", title: "Öffnungszeiten", type: "string"}),
        defineField({name: "instagram", title: "Instagram Handle", type: "string"}),
        defineField({name: "instagramUrl", title: "Instagram Link", type: "url"}),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({name: "description", title: "Beschreibung", type: "text"}),
        defineField({name: "poweredBy", title: "Powered by", type: "string"}),
      ],
    }),
  ],
});
