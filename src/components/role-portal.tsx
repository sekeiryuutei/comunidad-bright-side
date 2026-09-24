import { Link } from "@tanstack/react-router";
import {
  Bell, Building2, CalendarDays, Car, CheckCircle2, ChevronRight, ClipboardList,
  CreditCard, FileText, Home, LogIn, Megaphone, Menu, MessageSquareText, Package,
  Plus, ReceiptText, Search, ShieldCheck, UserCheck, Users, X,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Status } from "@/components/residential-app";

type IconType = ComponentType<{ className?: string }>;
type Section = {
  key: string; label: string; icon: IconType; description: string; action: string;
  metrics: [string, string, string][]; columns: string[]; rows: string[][];
};
type PortalConfig = {
  subtitle: string; user: string; initials: string; role: string; greeting: string;
  home: { title: string; items: string[] }[];
  sections: Section[];
};

const accents = ["bg-mint-soft text-mint-foreground", "bg-butter-soft text-butter-foreground", "bg-rose-soft text-rose-foreground", "bg-lilac-soft text-lilac-foreground"];

export const residentPortal: PortalConfig = {
  subtitle: "Portal del residente", user: "Laura Restrepo", initials: "LR", role: "Propietaria · A-402",
  greeting: "Hola, Laura",
  home: [
    { title: "Próximos pagos", items: ["Cuota de administración junio · $320.000 · vence 10 jun", "Parqueadero visitantes · $15.000 · vence 10 jun"] },
    { title: "Mis reservas", items: ["Salón social · 14 jun · 19:00–23:00", "Zona BBQ · 22 jun · 12:00–16:00"] },
    { title: "Comunicados", items: ["Asamblea ordinaria convocada para el 28 de mayo.", "Corte de agua programado el jueves 8:00–12:00."] },
  ],
  sections: [
    { key: "inicio", label: "Inicio", icon: Home, description: "Resumen de tu apartamento, pagos y novedades.", action: "Pagar cuota", metrics: [["Saldo actual", "$320.000", "Vence 10 jun"], ["Estado", "Al día", "Sin mora"], ["Reservas", "2", "Este mes"], ["PQRS abiertas", "1", "En revisión"]], columns: [], rows: [] },
    { key: "cuenta", label: "Estado de cuenta", icon: ReceiptText, description: "Cuentas de cobro, cargos e historial de tu unidad.", action: "Descargar certificado", metrics: [["Saldo", "$320.000", "Junio 2026"], ["Pagado en el año", "$1,6 M", "5 cuotas"], ["Intereses", "$0", "Sin mora"], ["Descuento", "5%", "Pronto pago"]], columns: ["Periodo", "Concepto", "Valor", "Vencimiento", "Estado"], rows: [["Junio 2026", "Administración", "$320.000", "10 jun", "Pendiente"], ["Mayo 2026", "Administración", "$320.000", "10 may", "Pagado"], ["Abril 2026", "Administración", "$320.000", "10 abr", "Pagado"], ["Marzo 2026", "Cuota extraordinaria", "$180.000", "31 mar", "Pagado"]] },
    { key: "pagos", label: "Mis pagos", icon: CreditCard, description: "Registra pagos y consulta tus comprobantes.", action: "Registrar pago", metrics: [["Último pago", "$320.000", "8 may"], ["Método", "PSE", "Bancolombia"], ["Comprobantes", "12", "Disponibles"], ["Pendientes", "1", "Junio"]], columns: ["Fecha", "Referencia", "Método", "Valor", "Estado"], rows: [["8 may 2026", "PSE-88231", "PSE", "$320.000", "Aplicado"], ["9 abr 2026", "PSE-77120", "PSE", "$320.000", "Aplicado"], ["28 mar 2026", "TRF-5521", "Transferencia", "$180.000", "Aplicado"], ["5 jun 2026", "CON-1002", "Consignación", "$320.000", "Pendiente"]] },
    { key: "reservas", label: "Reservas", icon: CalendarDays, description: "Reserva zonas comunes disponibles.", action: "Nueva reserva", metrics: [["Próxima", "14 jun", "Salón social"], ["Este año", "6", "Reservas"], ["Depósito", "$150.000", "Reembolsable"], ["Zonas", "5", "Disponibles"]], columns: ["Zona", "Fecha", "Horario", "Invitados", "Estado"], rows: [["Salón social", "14 jun", "19:00–23:00", "40", "Confirmada"], ["Zona BBQ", "22 jun", "12:00–16:00", "12", "Pendiente"], ["Piscina", "3 may", "14:00–16:00", "6", "Finalizado"], ["Cancha", "20 abr", "08:00–10:00", "10", "Finalizado"]] },
    { key: "pqrs", label: "PQRS", icon: MessageSquareText, description: "Peticiones, quejas, reclamos y solicitudes.", action: "Nueva PQRS", metrics: [["Abiertas", "1", "En revisión"], ["Resueltas", "4", "Este año"], ["Tiempo respuesta", "2,4 días", "Promedio"], ["Satisfacción", "4,6", "de 5"]], columns: ["Radicado", "Tipo", "Asunto", "Fecha", "Estado"], rows: [["PQ-1042", "Queja", "Ruido en horario nocturno", "2 jun", "Asignado"], ["PQ-0988", "Solicitud", "Cambio de tarjeta de acceso", "12 may", "Resuelto"], ["PQ-0915", "Petición", "Poda de jardín torre A", "20 abr", "Resuelto"]] },
    { key: "visitantes", label: "Mis visitantes", icon: UserCheck, description: "Preautoriza visitas y domicilios para portería.", action: "Autorizar visitante", metrics: [["Autorizados hoy", "2", "Activos"], ["Frecuentes", "5", "Registrados"], ["Domicilios", "8", "Este mes"], ["Vehículos", "1", "ABC-123"]], columns: ["Visitante", "Documento", "Fecha", "Tipo", "Estado"], rows: [["Andrés Gómez", "CC 1.020.334", "Hoy", "Familiar", "Activo"], ["Rappi", "—", "Hoy", "Domicilio", "Pendiente"], ["María Suárez", "CC 52.118.090", "Frecuente", "Empleada", "Activo"]] },
    { key: "comunicados", label: "Comunicados", icon: Megaphone, description: "Noticias y circulares de la administración.", action: "Marcar como leídos", metrics: [["Nuevos", "3", "Sin leer"], ["Este mes", "7", "Publicados"], ["Asambleas", "1", "28 may"], ["Documentos", "14", "Disponibles"]], columns: ["Título", "Tipo", "Fecha", "Autor", "Estado"], rows: [["Convocatoria asamblea ordinaria", "Circular", "15 may", "Administración", "Publicado"], ["Corte de agua programado", "Aviso", "3 jun", "Administración", "Publicado"], ["Reglamento de piscina", "Documento", "1 may", "Consejo", "Publicado"]] },
  ],
};

export const guardPortal: PortalConfig = {
  subtitle: "Portal de portería", user: "Carlos Méndez", initials: "CM", role: "Vigilante · Turno día",
  greeting: "Turno día · Portería principal",
  home: [
    { title: "Visitas esperadas", items: ["Andrés Gómez → A-402 · familiar", "Técnico Claro → B-108 · 10:00–12:00", "Rappi → C-215 · domicilio"] },
    { title: "Paquetes por entregar", items: ["Servientrega → A-310 · caja mediana", "Amazon → B-506 · sobre", "Mercado Libre → C-101 · caja pequeña"] },
    { title: "Novedades del turno", items: ["Portón vehicular revisado a las 07:10.", "Reserva salón social hoy 19:00 (C-101).", "Corte de agua jueves 8:00–12:00."] },
  ],
  sections: [
    { key: "inicio", label: "Inicio", icon: Home, description: "Resumen del turno, visitas y correspondencia.", action: "Registrar ingreso", metrics: [["Visitantes hoy", "38", "12 dentro"], ["Vehículos", "21", "Parqueadero visitantes 6/10"], ["Paquetes", "9", "Por entregar"], ["Novedades", "3", "Este turno"]], columns: [], rows: [] },
    { key: "visitantes", label: "Visitantes", icon: Users, description: "Registro de ingreso y salida de visitantes.", action: "Registrar ingreso", metrics: [["Dentro", "12", "Ahora"], ["Ingresos hoy", "38", "+6 vs ayer"], ["Preautorizados", "7", "Pendientes"], ["Rechazados", "1", "Sin autorización"]], columns: ["Visitante", "Documento", "Destino", "Ingreso", "Estado"], rows: [["Andrés Gómez", "CC 1.020.334", "A-402", "09:12", "Dentro"], ["Técnico Claro", "CC 80.221.450", "B-108", "10:05", "Dentro"], ["Paola Ruiz", "CC 1.032.998", "C-215", "08:40", "Salió"], ["Sin nombre", "—", "A-310", "08:15", "Rechazado"]] },
    { key: "vehiculos", label: "Vehículos", icon: Car, description: "Control de vehículos de residentes y visitantes.", action: "Registrar vehículo", metrics: [["Visitantes", "6/10", "Cupos ocupados"], ["Residentes", "212", "Registrados"], ["Motos", "38", "Registradas"], ["Alertas", "1", "Mal parqueado"]], columns: ["Placa", "Tipo", "Unidad", "Ingreso", "Estado"], rows: [["ABC-123", "Automóvil", "A-402", "07:30", "Residente"], ["KLM-908", "Camioneta", "Visitante B-108", "10:05", "Dentro"], ["XYZ-45F", "Moto", "C-215", "08:10", "Residente"], ["JHT-221", "Automóvil", "Visitante A-310", "06:50", "Mal parqueado"]] },
    { key: "autorizaciones", label: "Autorizaciones", icon: ShieldCheck, description: "Preautorizaciones enviadas por los residentes.", action: "Verificar autorización", metrics: [["Activas", "7", "Hoy"], ["Frecuentes", "46", "Empleados y familiares"], ["Domicilios", "5", "Pendientes"], ["Vencidas", "2", "Ayer"]], columns: ["Autorizado", "Unidad", "Tipo", "Vigencia", "Estado"], rows: [["Andrés Gómez", "A-402", "Familiar", "Hoy", "Activo"], ["Rappi", "A-402", "Domicilio", "Hoy", "Pendiente"], ["María Suárez", "A-402", "Empleada", "Permanente", "Activo"], ["Obras Díaz", "B-506", "Contratista", "Ayer", "Vencida"]] },
    { key: "paquetes", label: "Correspondencia", icon: Package, description: "Recepción y entrega de paquetes.", action: "Recibir paquete", metrics: [["Por entregar", "9", "En portería"], ["Recibidos hoy", "14", "+3 vs ayer"], ["Entregados", "5", "Hoy"], ["Más de 3 días", "1", "Avisar"]], columns: ["Empresa", "Unidad", "Tipo", "Recibido", "Estado"], rows: [["Servientrega", "A-310", "Caja mediana", "08:20", "Pendiente"], ["Amazon", "B-506", "Sobre", "09:02", "Pendiente"], ["Mercado Libre", "C-101", "Caja pequeña", "Ayer", "Entregado"], ["DHL", "A-205", "Caja grande", "Hace 4 días", "Sin reclamar"]] },
    { key: "minuta", label: "Minuta", icon: ClipboardList, description: "Novedades y bitácora del turno.", action: "Nueva novedad", metrics: [["Novedades", "3", "Este turno"], ["Rondas", "4/6", "Completadas"], ["Incidentes", "0", "Sin reportes"], ["Relevo", "18:00", "Turno noche"]], columns: ["Hora", "Novedad", "Ubicación", "Registró", "Estado"], rows: [["07:10", "Revisión portón vehicular", "Acceso principal", "Carlos Méndez", "Resuelto"], ["09:30", "Ronda perimetral", "Torres A–C", "Carlos Méndez", "Finalizado"], ["10:45", "Luz fundida pasillo", "Torre B piso 3", "Carlos Méndez", "Pendiente"]] },
    { key: "citofonia", label: "Directorio", icon: FileText, description: "Contactos de residentes para citofonía.", action: "Llamar", metrics: [["Unidades", "256", "3 torres"], ["Contactos", "412", "Registrados"], ["Sin teléfono", "4", "Actualizar"], ["Emergencias", "6", "Números"]], columns: ["Unidad", "Residente", "Teléfono", "Extensión", "Estado"], rows: [["A-402", "Laura Restrepo", "310 555 0142", "4402", "Activo"], ["B-108", "Jorge Pineda", "315 555 0198", "1108", "Activo"], ["C-215", "Sofía Vargas", "320 555 0111", "2215", "Activo"], ["A-310", "Mateo Cruz", "—", "3310", "Actualizar"]] },
  ],
};

export function RolePortal({ config }: { config: PortalConfig }) {
  const [active, setActive] = useState(config.sections[0]?.key ?? "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<string[] | null>(null);
  const [notice, setNotice] = useState("");
  const section = (config.sections.find((s) => s.key === active) ?? config.sections[0]) as Section;
  const isHome = section.columns.length === 0;
  const rows = useMemo(() => {
    const q = query.toLocaleLowerCase("es");
    return section.rows.filter((r) => r.join(" ").toLocaleLowerCase("es").includes(q));
  }, [section, query]);
  const save = () => { setDialogOpen(false); setNotice(`${section.action}: registrado correctamente.`); window.setTimeout(() => setNotice(""), 2800); };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {menuOpen && <button aria-label="Cerrar menú" className="fixed inset-0 z-30 bg-overlay lg:hidden" onClick={() => setMenuOpen(false)} />}
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-sidebar p-4 transition-transform lg:sticky lg:top-0 lg:h-screen ${menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-brand"><Building2 className="size-6" /></div>
            <div className="min-w-0"><p className="font-display text-xl font-extrabold leading-none">Residencias Albor</p><p className="mt-1 text-xs font-bold text-muted-foreground">{config.subtitle}</p></div>
            <Button aria-label="Cerrar menú" size="icon" variant="ghost" className="ml-auto rounded-full lg:hidden" onClick={() => setMenuOpen(false)}><X /></Button>
          </div>
          <div className="mt-4 rounded-2xl bg-secondary p-3"><p className="text-xs font-extrabold text-muted-foreground">COPROPIEDAD</p><div className="mt-1 flex items-center justify-between"><span className="text-sm font-extrabold">Reserva del Bosque</span><ChevronRight className="size-4 text-muted-foreground" /></div></div>
          <nav className="mt-4 flex-1 overflow-y-auto" aria-label="Secciones">
            {config.sections.map((s) => {
              const Icon = s.icon; const on = s.key === section.key;
              return <button key={s.key} onClick={() => { setActive(s.key); setQuery(""); setMenuOpen(false); }} className={`mb-0.5 flex min-h-10 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition-colors ${on ? "bg-primary text-primary-foreground shadow-brand" : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"}`}><Icon className="size-4" />{s.label}</button>;
            })}
            <p className="mt-4 px-3 pb-1 text-[10px] font-extrabold uppercase text-muted-foreground">Cambiar vista (demo)</p>
            <Link to="/" className="flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-sidebar-foreground hover:bg-accent"><LogIn className="size-4" />Administración</Link>
            <Link to="/residente" className="flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-sidebar-foreground hover:bg-accent" activeProps={{ className: "text-primary" }}><Home className="size-4" />Residente</Link>
            <Link to="/porteria" className="flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-sidebar-foreground hover:bg-accent" activeProps={{ className: "text-primary" }}><ShieldCheck className="size-4" />Portería</Link>
          </nav>
          <div className="mt-2 flex items-center gap-3 rounded-2xl bg-secondary p-3"><div className="grid size-10 place-items-center rounded-full bg-mint-soft font-display font-extrabold text-mint-foreground">{config.initials}</div><div><p className="text-sm font-extrabold">{config.user}</p><p className="text-xs font-semibold text-muted-foreground">{config.role}</p></div></div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-20 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-xl md:px-7">
            <Button aria-label="Abrir menú" size="icon" variant="ghost" className="rounded-full lg:hidden" onClick={() => setMenuOpen(true)}><Menu /></Button>
            {!isHome && <div className="relative hidden max-w-md flex-1 sm:block"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input aria-label="Buscar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Buscar en ${section.label.toLocaleLowerCase("es")}…`} className="h-11 w-full rounded-full border-0 bg-card pl-11 pr-4 text-sm font-semibold shadow-soft outline-none ring-primary/30 focus:ring-2" /></div>}
            <div className="ml-auto flex items-center gap-2"><Button aria-label="Notificaciones" variant="secondary" size="icon" className="relative rounded-full"><Bell /><span className="absolute right-1 top-1 size-2 rounded-full bg-destructive" /></Button><Button onClick={() => setDialogOpen(true)} className="rounded-full shadow-brand"><Plus /><span className="hidden sm:inline">{section.action}</span></Button></div>
          </header>
          <div className="mx-auto max-w-[1480px] p-4 md:p-7">
            <p className="text-xs font-extrabold uppercase text-primary">Reserva del Bosque · Bogotá</p>
            <h1 className="mt-1 font-display text-3xl font-extrabold md:text-4xl">{isHome ? config.greeting : section.label}</h1>
            <p className="mt-1 max-w-2xl text-sm font-semibold text-muted-foreground">{section.description}</p>
            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {section.metrics.map(([label, value, note], i) => <article key={label} className="rounded-3xl bg-card p-5 shadow-soft"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold uppercase text-muted-foreground">{label}</p><p className="mt-2 font-display text-2xl font-extrabold">{value}</p></div><span className={`grid size-10 shrink-0 place-items-center rounded-2xl ${accents[i]}`}><section.icon className="size-5" /></span></div><p className="mt-2 text-xs font-bold text-muted-foreground">{note}</p></article>)}
            </section>
            {isHome ? (
              <section className="mt-5 grid gap-5 lg:grid-cols-3">
                {config.home.map((card, ci) => <article key={card.title} className="rounded-3xl bg-card p-6 shadow-soft"><h2 className="font-display text-lg font-extrabold">{card.title}</h2><div className="mt-4 space-y-3">{card.items.map((item, i) => <div key={item} className="flex gap-3 rounded-2xl bg-secondary p-3"><span className={`mt-1 size-2.5 shrink-0 rounded-full ${(i + ci) % 3 === 0 ? "bg-primary" : (i + ci) % 3 === 1 ? "bg-peach" : "bg-mint"}`} /><p className="text-sm font-bold leading-snug">{item}</p></div>)}</div></article>)}
              </section>
            ) : (
              <section className="mt-5 overflow-hidden rounded-3xl bg-card shadow-soft">
                <div className="border-b border-border px-5 py-4"><h2 className="font-display text-lg font-extrabold">Registros</h2><p className="text-xs font-semibold text-muted-foreground">{rows.length} registros</p></div>
                <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead><tr className="bg-secondary/70 text-xs font-extrabold uppercase text-muted-foreground">{section.columns.map((c) => <th key={c} className="px-5 py-3">{c}</th>)}<th className="px-5 py-3 text-right">Detalle</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <tr key={row.join("-")} className="hover:bg-accent/50">{row.map((cell, i) => <td key={`${cell}-${i}`} className={`px-5 py-4 ${i === 0 ? "font-extrabold" : "font-semibold text-muted-foreground"}`}>{i === row.length - 1 ? <Status value={cell} /> : cell}</td>)}<td className="px-5 py-3 text-right"><Button aria-label={`Ver ${row[0]}`} variant="ghost" size="icon" className="rounded-full" onClick={() => setSelected(row)}><ChevronRight /></Button></td></tr>)}</tbody></table></div>
                {rows.length === 0 && <p className="p-10 text-center font-extrabold text-muted-foreground">No encontramos resultados</p>}
              </section>
            )}
          </div>
        </main>
      </div>
      {notice && <div role="status" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-2xl bg-success px-4 py-3 text-sm font-extrabold text-success-foreground shadow-elevated"><CheckCircle2 className="size-5" />{notice}</div>}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent className="rounded-3xl border-0 bg-card shadow-elevated"><DialogHeader><DialogTitle className="font-display text-2xl font-extrabold">{section.action}</DialogTitle><DialogDescription>Información de demostración.</DialogDescription></DialogHeader><div className="grid gap-4 py-2"><label className="grid gap-1.5 text-sm font-bold">Nombre o referencia<input className="h-11 rounded-xl bg-secondary px-3 outline-none ring-primary/30 focus:ring-2" /></label><label className="grid gap-1.5 text-sm font-bold">Unidad<input className="h-11 rounded-xl bg-secondary px-3 outline-none ring-primary/30 focus:ring-2" placeholder="Ej. A-402" /></label><label className="grid gap-1.5 text-sm font-bold">Observaciones<textarea className="min-h-24 rounded-xl bg-secondary p-3 outline-none ring-primary/30 focus:ring-2" /></label></div><DialogFooter><Button variant="secondary" className="rounded-full" onClick={() => setDialogOpen(false)}>Cancelar</Button><Button className="rounded-full" onClick={save}>Guardar</Button></DialogFooter></DialogContent></Dialog>
      <Dialog open={Boolean(selected)} onOpenChange={(o) => !o && setSelected(null)}><DialogContent className="rounded-3xl border-0 bg-card shadow-elevated"><DialogHeader><DialogTitle className="font-display text-2xl font-extrabold">{selected?.[0]}</DialogTitle><DialogDescription>Detalle del registro.</DialogDescription></DialogHeader><div className="grid gap-3 py-2">{selected?.map((v, i) => <div key={`${v}-${i}`} className="flex items-center justify-between rounded-2xl bg-secondary px-4 py-3"><span className="text-xs font-extrabold uppercase text-muted-foreground">{section.columns[i]}</span><span className="text-sm font-extrabold">{v}</span></div>)}</div><DialogFooter><Button className="rounded-full" onClick={() => setSelected(null)}>Cerrar</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}
