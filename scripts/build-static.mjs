import {cp, mkdir, writeFile} from "node:fs/promises";
import {resolve} from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const publicDir = resolve(root, "public");
const distDir = resolve(root, "dist");

await mkdir(distDir, {recursive: true});
await cp(publicDir, distDir, {recursive: true, force: true});

await writeFile(
  resolve(distDir, "index.html"),
  `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hüpfi - Hüpfburgen & Partyverleih Mönchengladbach</title>
    <meta name="description" content="Hüpfi bietet Hüpfburgen und Partyverleih für Events in Mönchengladbach, Neuss, Düsseldorf und Niederrhein." />
    <style>
      html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#fff7ed}
      iframe{width:100vw;height:100vh;border:0;display:block}
    </style>
  </head>
  <body>
    <iframe id="pageFrame" title="Hüpfi Website"></iframe>
    <script>
      const routes = {
        "/": "/huepfi.html",
        "/equipment": "/equipment.html",
        "/huepfburgen": "/huepfburgen.html",
        "/eventmanufaktur": "/eventmanufaktur.html",
        "/impressum": "/impressum.html",
        "/datenschutz": "/datenschutz.html"
      };
      const cleanPath = location.pathname.replace(/\\/$/, "") || "/";
      document.getElementById("pageFrame").src = routes[cleanPath] || "/huepfi.html";
    </script>
  </body>
</html>
`,
);
