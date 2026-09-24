import { createFileRoute } from "@tanstack/react-router";
import { RolePortal, residentPortal } from "@/components/role-portal";

const title = "Portal del residente — Residencias Albor";
const description = "Consulta tu estado de cuenta, paga, reserva zonas comunes y radica PQRS.";

export const Route = createFileRoute("/residente")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <RolePortal config={residentPortal} />,
});
