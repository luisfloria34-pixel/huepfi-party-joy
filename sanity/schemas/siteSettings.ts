import {defineField, defineType} from "sanity";

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
            defineField({name: "imageUrl", title: "Hero Bild URL", type: "url"}),
          ],
        }),
      ],
    }),
    defineField({
      name: "services",
      title: "Leistungen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({name: "title", title: "Titel", type: "string"}),
            defineField({name: "description", title: "Beschreibung", type: "text"}),
            defineField({name: "imageUrl", title: "Bild URL", type: "url"}),
          ],
        },
      ],
    }),
    defineField({
      name: "about",
      title: "Über Uns",
      type: "object",
      fields: [
        defineField({name: "text", title: "Text", type: "text"}),
        defineField({name: "imageUrl", title: "Bild URL", type: "url"}),
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
      ],
    }),
  ],
});
