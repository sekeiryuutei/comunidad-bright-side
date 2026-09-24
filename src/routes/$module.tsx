import { createFileRoute } from "@tanstack/react-router";
import { ResidentialApp, moduleTitle } from "@/components/residential-app";

export const Route = createFileRoute("/$module")({
  head: ({ params }) => {
    const title = `${moduleTitle(params.module)} — Residencias Albor`;
    const description = `Gestión de ${moduleTitle(params.module).toLocaleLowerCase("es")} para Reserva del Bosque.`;
    return { meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: ModulePage,
});

function ModulePage() {
  const { module } = Route.useParams();
  return <ResidentialApp module={module} />;
}