import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/huepfi.html"
      title="Hüpfi Landingpage"
      style={{ width: "100vw", height: "100vh", border: 0, display: "block" }}
    />
  );
}
