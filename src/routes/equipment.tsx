import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      { title: "Party-Equipment mieten | Hüpfi Mönchengladbach" },
      { name: "description", content: "Bierzeltgarnituren, Musikboxen, Lichttechnik, Nebelmaschine & mehr – Equipment-Verleih in Mönchengladbach, Düsseldorf & Niederrhein." },
    ],
  }),
  component: EquipmentPage,
});

function EquipmentPage() {
  return (
    <iframe
      src="/equipment.html"
      title="Equipment Auswahl"
      style={{ width: "100vw", height: "100vh", border: 0, display: "block" }}
    />
  );
}