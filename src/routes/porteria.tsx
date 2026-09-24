import { createFileRoute } from "@tanstack/react-router";
import { RolePortal, guardPortal } from "@/components/role-portal";

const title = "Portal de portería — Residencias Albor";
const description = "Registro de visitantes, vehículos, autorizaciones y correspondencia.";

export const Route = createFileRoute("/porteria")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <RolePortal config={guardPortal} />,
});
