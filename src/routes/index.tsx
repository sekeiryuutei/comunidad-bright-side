import { createFileRoute } from "@tanstack/react-router";
import { ResidentialApp } from "@/components/residential-app";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Dashboard — Residencias Albor" },
    { name: "description", content: "Resumen financiero y operativo de Reserva del Bosque." },
    { property: "og:title", content: "Dashboard — Residencias Albor" },
    { property: "og:description", content: "Resumen financiero y operativo de Reserva del Bosque." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <ResidentialApp />;
}
