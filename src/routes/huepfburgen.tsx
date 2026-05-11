import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/huepfburgen")({
  head: () => ({
    meta: [
      { title: "Hüpfburgen mieten – Auswahl | Hüpfi Mönchengladbach" },
      { name: "description", content: "Alle Hüpfburgen von Hüpfi: TÜV-zertifiziert, mit Lieferung & Aufbau in Mönchengladbach, Düsseldorf & Niederrhein." },
    ],
  }),
  component: HuepfburgenPage,
});

function HuepfburgenPage() {
  return (
    <iframe
      src="/huepfburgen.html"
      title="Hüpfburgen Auswahl"
      style={{ width: "100vw", height: "100vh", border: 0, display: "block" }}
    />
  );
}