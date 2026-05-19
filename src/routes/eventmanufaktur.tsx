import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/eventmanufaktur")({
  head: () => ({
    meta: [
      { title: "Eventmanufaktur – Große Events. Komplette Umsetzung. | Hüpfi" },
      { name: "description", content: "Firmenfeiern, Stadtfeste, Hochzeiten, Messen & mehr: Die Eventmanufaktur plant dein Event komplett – Konzept, Logistik, Technik, Catering." },
    ],
  }),
  component: EventmanufakturPage,
});

function EventmanufakturPage() {
  return (
    <iframe
      src="/eventmanufaktur.html"
      title="Eventmanufaktur"
      style={{ width: "100vw", height: "100vh", border: 0, display: "block" }}
    />
  );
}