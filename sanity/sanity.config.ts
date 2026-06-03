import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./schemas";

export default defineConfig({
  name: "huepfi",
  title: "Hüpfi Inhalte",
  projectId: "4njm9ki2",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Inhalte")
          .items([
            S.listItem()
              .title("Website Inhalte")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Website Inhalte"),
              ),
            S.divider(),
            S.documentTypeListItem("blogPost").title("Blog"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
