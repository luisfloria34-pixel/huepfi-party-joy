import {defineField, defineType} from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blogbeitrag",
  type: "document",
  fields: [
    defineField({name: "title", title: "Titel", type: "string"}),
    defineField({name: "slug", title: "Slug", type: "slug", options: {source: "title"}}),
    defineField({name: "publishedAt", title: "Veröffentlichungsdatum", type: "datetime"}),
    defineField({name: "imageUrl", title: "Bild URL", type: "url"}),
    defineField({name: "body", title: "Inhalt", type: "array", of: [{type: "block"}]}),
  ],
});
