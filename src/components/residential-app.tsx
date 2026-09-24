import { Link } from "@tanstack/react-router";
import {
  Bell, Building2, CalendarDays, ChevronRight, CircleDollarSign, ClipboardList,
  FileBarChart, FileText, Home, LayoutDashboard, Menu, MessageSquareText,
  PackageCheck, Search, Settings, ShieldCheck, Users, WalletCards, Wrench,
  X, Plus, Download, SlidersHorizontal, CheckCircle2, Clock3, TriangleAlert,
  Vote, Megaphone, UserCog, ReceiptText, HandCoins, BookOpenCheck,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ModuleKey =
  | "dashboard" | "residentes" | "inmuebles" | "cuotas" | "cartera" | "pagos"
  | "contabilidad" | "proveedores" | "mantenimiento" | "reservas" | "pqrs"
  | "comunicados" | "documentos" | "seguridad" | "asambleas" | "usuarios"
  | "notificaciones" | "reportes";

type IconType = ComponentType<{ className?: string }>;

type ModuleConfig = {
  key: ModuleKey;
  label: string;
  group: "General" | "Finanzas" | "Operación" | "Comunidad" | "Sistema";
  icon: IconType;
  description: string;
  action: string;
  metrics: [string, string, string][];
  columns: string[];
  rows: string[][];
};

const modules: ModuleConfig[] = [
  { key: "dashboard", label: "Dashboard", group: "General", icon: LayoutDashboard, description: "Estado financiero, actividad y novedades del conjunto.", action: "Registrar pago", metrics: [], columns: [], rows: [] },
  { key: "residentes", label: "Residentes", group: "General", icon: Users, description: "Propietarios, arrendatarios, residentes y sus contactos.", action: "Nuevo residente", metrics: [["Personas registradas", "418", "+12 este mes"], ["Propietarios", "256", "61% del total"], ["Arrendatarios", "146", "35% del total"], ["Datos pendientes", "16", "Requieren revisión"]], columns: ["Residente", "Unidad", "Tipo", "Contacto", "Estado"], rows: [["Laura Restrepo", "A-402", "Propietaria", "300 425 8091", "Activo"], ["Julián Pineda", "B-108", "Arrendatario", "315 820 1142", "Activo"], ["María Salazar", "C-215", "Propietaria", "301 902 3188", "Actualizar"], ["Ricardo Acosta", "A-310", "Residente", "320 441 9030", "Activo"]] },
  { key: "inmuebles", label: "Inmuebles", group: "General", icon: Building2, description: "Torres, apartamentos, coeficientes y propietarios asociados.", action: "Nuevo inmueble", metrics: [["Unidades", "256", "3 torres"], ["Ocupadas", "248", "96,5%"], ["Desocupadas", "8", "Disponibles"], ["Coeficiente", "100%", "Conciliado"]], columns: ["Unidad", "Torre", "Coeficiente", "Propietario", "Cartera"], rows: [["A-402", "Torre A", "0,42%", "Laura Restrepo", "Al día"], ["B-108", "Torre B", "0,39%", "Julián Pineda", "Al día"], ["C-215", "Torre C", "0,44%", "María Salazar", "Pendiente"], ["A-310", "Torre A", "0,41%", "Ricardo Acosta", "En mora"]] },
  { key: "cuotas", label: "Cuotas de administración", group: "Finanzas", icon: ReceiptText, description: "Generación mensual, conceptos, intereses y descuentos.", action: "Generar cuotas", metrics: [["Facturado mayo", "$81,9 M", "256 unidades"], ["Cuota promedio", "$320.000", "+4% anual"], ["Descuentos", "$2,4 M", "Pronto pago"], ["Intereses", "$860 mil", "Causados"]], columns: ["Periodo", "Concepto", "Unidades", "Valor", "Estado"], rows: [["Mayo 2026", "Administración", "256", "$81.920.000", "Emitida"], ["Mayo 2026", "Parqueadero", "84", "$4.200.000", "Emitida"], ["Abril 2026", "Interés de mora", "18", "$860.000", "Cerrada"], ["Abril 2026", "Descuento pronto pago", "192", "-$2.400.000", "Aplicado"]] },
  { key: "cartera", label: "Cartera", group: "Finanzas", icon: HandCoins, description: "Morosos, saldos, acuerdos de pago y estados de cuenta.", action: "Nuevo acuerdo", metrics: [["Saldo total", "$18,5 M", "22 unidades"], ["Mora > 60 días", "$7,2 M", "8 unidades"], ["Acuerdos activos", "6", "$5,8 M"], ["Recuperado", "84%", "+6 pts"]], columns: ["Unidad", "Responsable", "Saldo", "Edad", "Gestión"], rows: [["A-310", "Ricardo Acosta", "$2.840.000", "92 días", "Prejurídico"], ["C-215", "María Salazar", "$1.280.000", "48 días", "Acuerdo"], ["B-502", "Carlos Vargas", "$960.000", "35 días", "Recordatorio"], ["A-118", "Camilo Restrepo", "$720.000", "18 días", "Contactado"]] },
  { key: "pagos", label: "Pagos", group: "Finanzas", icon: CircleDollarSign, description: "Registro, comprobantes y conciliación de pagos.", action: "Registrar pago", metrics: [["Recaudo del mes", "$76,8 M", "94,2%"], ["Por conciliar", "$3,1 M", "9 movimientos"], ["Transferencias", "186", "72%"], ["Efectivo", "$640 mil", "2 registros"]], columns: ["Comprobante", "Unidad", "Fecha", "Medio", "Valor"], rows: [["RC-2841", "A-402", "12 may, 09:14", "Transferencia", "$320.000"], ["RC-2840", "B-108", "12 may, 08:47", "PSE", "$365.000"], ["RC-2839", "C-215", "11 may, 16:20", "Consignación", "$320.000"], ["RC-2838", "A-305", "11 may, 14:05", "Transferencia", "$640.000"]] },
  { key: "contabilidad", label: "Presupuesto y contabilidad", group: "Finanzas", icon: WalletCards, description: "Ingresos, egresos, presupuesto y cuentas por pagar.", action: "Nuevo movimiento", metrics: [["Ingresos", "$81,6 M", "+8,4%"], ["Egresos", "$57,9 M", "71% ejecutado"], ["Disponible", "$23,7 M", "Mes actual"], ["Por pagar", "$9,3 M", "7 cuentas"]], columns: ["Cuenta", "Categoría", "Presupuesto", "Ejecutado", "Estado"], rows: [["5105", "Vigilancia", "$28.000.000", "$27.800.000", "99%"], ["5110", "Aseo", "$12.500.000", "$10.200.000", "82%"], ["5120", "Mantenimiento", "$18.000.000", "$9.840.000", "55%"], ["5130", "Servicios públicos", "$16.000.000", "$12.300.000", "77%"]] },
  { key: "proveedores", label: "Proveedores", group: "Operación", icon: PackageCheck, description: "Empresas contratadas, contratos y servicios prestados.", action: "Nuevo proveedor", metrics: [["Proveedores", "24", "18 activos"], ["Contratos activos", "12", "$58,4 M/mes"], ["Por vencer", "3", "Próximos 30 días"], ["Evaluación", "4,6/5", "Promedio"]], columns: ["Proveedor", "Servicio", "Contrato", "Vence", "Estado"], rows: [["VigilPro SAS", "Seguridad", "CT-042", "30 nov 2026", "Activo"], ["Aseo Total", "Aseo", "CT-038", "24 may 2026", "Por vencer"], ["Elevadores Andinos", "Ascensores", "CT-035", "12 feb 2027", "Activo"], ["Jardines Vivos", "Paisajismo", "CT-031", "18 ago 2026", "Activo"]] },
  { key: "mantenimiento", label: "Mantenimiento", group: "Operación", icon: Wrench, description: "Solicitudes y mantenimientos preventivos o correctivos.", action: "Nueva orden", metrics: [["Órdenes abiertas", "17", "5 prioritarias"], ["Preventivos", "8", "Esta semana"], ["Correctivos", "9", "3 vencidos"], ["Cumplimiento", "91%", "+2 pts"]], columns: ["Orden", "Activo / Zona", "Tipo", "Responsable", "Estado"], rows: [["OT-184", "Ascensor Torre B", "Preventivo", "Elevadores Andinos", "Programado"], ["OT-183", "Piscina", "Correctivo", "Carlos Méndez", "En proceso"], ["OT-182", "Portón vehicular", "Correctivo", "TecniPuertas", "Prioritario"], ["OT-181", "Bombas hidráulicas", "Preventivo", "Hidroservicios", "Finalizado"]] },
  { key: "reservas", label: "Reservas", group: "Operación", icon: CalendarDays, description: "Disponibilidad y reservas de las zonas comunes.", action: "Nueva reserva", metrics: [["Reservas hoy", "8", "3 espacios"], ["Esta semana", "34", "82% ocupación"], ["Pendientes", "5", "Por aprobar"], ["Recaudo", "$1,8 M", "Este mes"]], columns: ["Espacio", "Fecha y hora", "Residente", "Unidad", "Estado"], rows: [["Piscina", "Hoy · 14:00–16:00", "Familia Ríos", "A-204", "Confirmada"], ["Zona BBQ", "Hoy · 18:00–21:00", "Sandra Mora", "A-305", "Confirmada"], ["Salón social", "Hoy · 19:00–23:00", "Camilo León", "C-101", "Pendiente"], ["Cancha", "Mañana · 08:00–10:00", "Luis Torres", "B-402", "Confirmada"]] },
  { key: "pqrs", label: "PQRS", group: "Comunidad", icon: MessageSquareText, description: "Peticiones, quejas, reclamos y solicitudes de la comunidad.", action: "Nueva solicitud", metrics: [["Abiertas", "12", "3 prioritarias"], ["En proceso", "8", "Responsable asignado"], ["Resueltas", "88%", "Este mes"], ["Tiempo medio", "1,8 días", "-0,4 días"]], columns: ["Radicado", "Asunto", "Solicitante", "Fecha", "Estado"], rows: [["PQR-284", "Ruido en zona común", "A-402", "12 may", "Nuevo"], ["PQR-283", "Fuga de agua Torre 2", "B-108", "11 may", "En proceso"], ["PQR-282", "Iluminación parqueadero", "C-215", "10 may", "Asignado"], ["PQR-281", "Mascota sin correa", "A-310", "09 may", "Resuelto"]] },
  { key: "comunicados", label: "Comunicados", group: "Comunidad", icon: Megaphone, description: "Noticias, circulares y avisos para residentes.", action: "Nuevo comunicado", metrics: [["Publicados", "18", "Este mes"], ["Lectura", "82%", "+7 pts"], ["Programados", "3", "Próxima semana"], ["Borradores", "4", "Sin publicar"]], columns: ["Título", "Audiencia", "Publicado", "Lecturas", "Estado"], rows: [["Convocatoria asamblea", "Todos", "12 may", "84%", "Publicado"], ["Cierre temporal piscina", "Todos", "11 may", "76%", "Publicado"], ["Lavado de tanques", "Torres A y B", "10 may", "92%", "Publicado"], ["Campaña de reciclaje", "Todos", "—", "—", "Borrador"]] },
  { key: "documentos", label: "Documentos", group: "Comunidad", icon: FileText, description: "Actas, contratos, reglamentos y certificados.", action: "Subir documento", metrics: [["Documentos", "186", "8,4 GB"], ["Compartidos", "74", "Con residentes"], ["Actualizados", "12", "Este mes"], ["Por vencer", "4", "Revisar"]], columns: ["Documento", "Categoría", "Versión", "Actualizado", "Acceso"], rows: [["Reglamento PH", "Reglamentos", "v4.2", "04 may 2026", "Público"], ["Acta asamblea 2025", "Actas", "Final", "18 mar 2026", "Residentes"], ["Contrato VigilPro", "Contratos", "v2", "02 ene 2026", "Consejo"], ["Póliza zonas comunes", "Seguros", "2026", "15 dic 2025", "Administración"]] },
  { key: "seguridad", label: "Seguridad y visitantes", group: "Operación", icon: ShieldCheck, description: "Visitantes, autorizaciones, vehículos y novedades de portería.", action: "Registrar ingreso", metrics: [["Visitantes hoy", "42", "6 presentes"], ["Autorizados", "31", "Previamente"], ["Vehículos", "18", "Ingresos hoy"], ["Novedades", "3", "1 prioritaria"]], columns: ["Visitante", "Destino", "Ingreso", "Vehículo", "Estado"], rows: [["Andrés Molina", "A-402", "10:42", "KLP 284", "Dentro"], ["Paula Mejía", "B-108", "10:15", "—", "Salió"], ["Domicilio Rappi", "C-215", "09:58", "Moto", "Salió"], ["Juan Camilo Ríos", "A-305", "09:32", "JTR 908", "Dentro"]] },
  { key: "asambleas", label: "Asambleas", group: "Comunidad", icon: Vote, description: "Convocatorias, asistencia, votaciones y actas.", action: "Nueva asamblea", metrics: [["Próxima", "28 may", "Ordinaria"], ["Convocados", "256", "Propietarios"], ["Confirmados", "148", "57,8%"], ["Poderes", "32", "Registrados"]], columns: ["Asamblea", "Fecha", "Modalidad", "Quórum", "Estado"], rows: [["Ordinaria 2026", "28 may 2026", "Mixta", "57,8%", "Convocada"], ["Extraordinaria presupuesto", "14 nov 2025", "Virtual", "72,4%", "Finalizada"], ["Ordinaria 2025", "22 mar 2025", "Presencial", "81,2%", "Finalizada"], ["Comité de convivencia", "08 feb 2025", "Virtual", "68,7%", "Finalizada"]] },
  { key: "usuarios", label: "Usuarios y permisos", group: "Sistema", icon: UserCog, description: "Accesos de administración, consejo, residentes y portería.", action: "Invitar usuario", metrics: [["Usuarios", "284", "272 activos"], ["Administradores", "4", "Acceso completo"], ["Consejo", "7", "Acceso limitado"], ["Invitaciones", "12", "Pendientes"]], columns: ["Usuario", "Rol", "Último acceso", "Permisos", "Estado"], rows: [["Carlos Andrés García", "Administrador", "Hoy, 10:48", "Completo", "Activo"], ["Carlos Méndez", "Portería", "Hoy, 10:42", "Seguridad", "Activo"], ["Ana Ríos", "Consejo", "Ayer, 19:20", "Consulta", "Activo"], ["David León", "Contador", "10 may, 15:08", "Finanzas", "Activo"]] },
  { key: "notificaciones", label: "Notificaciones", group: "Sistema", icon: Bell, description: "Email, WhatsApp y avisos internos para la comunidad.", action: "Nueva campaña", metrics: [["Enviadas", "3.842", "Este mes"], ["Entrega", "98,2%", "Todos los canales"], ["Lectura", "79,4%", "+3,8 pts"], ["Programadas", "5", "Próximos 7 días"]], columns: ["Mensaje", "Canal", "Audiencia", "Envío", "Resultado"], rows: [["Recordatorio de pago", "WhatsApp", "18 unidades", "Hoy, 08:00", "94% leído"], ["Convocatoria asamblea", "Email + interna", "256 propietarios", "12 may", "82% leído"], ["Cierre de piscina", "Interna", "Todos", "11 may", "88% leído"], ["Extracto mensual", "Email", "256 unidades", "01 may", "96% entregado"]] },
  { key: "reportes", label: "Reportes", group: "Sistema", icon: FileBarChart, description: "Informes consolidados de operación y administración.", action: "Crear reporte", metrics: [["Generados", "42", "Este mes"], ["Programados", "8", "Automáticos"], ["Descargas", "126", "+18%"], ["Plantillas", "14", "Disponibles"]], columns: ["Reporte", "Periodo", "Formato", "Generado por", "Estado"], rows: [["Cartera por edades", "Mayo 2026", "Excel", "Carlos Andrés García", "Listo"], ["Ejecución presupuestal", "Ene–May 2026", "PDF", "David León", "Listo"], ["Ingresos y gastos", "Abril 2026", "Excel", "Sistema", "Listo"], ["Padrón de residentes", "Actual", "PDF", "Carlos Andrés García", "Procesando"]] },
];

const groups = ["General", "Finanzas", "Operación", "Comunidad", "Sistema"] as const;
const accentStyles = ["bg-mint-soft text-mint-foreground", "bg-butter-soft text-butter-foreground", "bg-rose-soft text-rose-foreground", "bg-lilac-soft text-lilac-foreground"];

function getModuleConfig(module?: string): ModuleConfig {
  const match = modules.find((item) => item.key === module);
  if (match) return match;
  const dashboard = modules.find((item) => item.key === "dashboard");
  if (!dashboard) throw new Error("No se encontró la configuración del dashboard");
  return dashboard;
}

export function ResidentialApp({ module = "dashboard" }: { module?: string }) {
  const config = getModuleConfig(module);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredRows = useMemo(() => {
    const normalized = query.toLocaleLowerCase("es");
    return config.rows.filter((row) => row.join(" ").toLocaleLowerCase("es").includes(normalized));
  }, [config.rows, query]);

  const action = () => {
    setDialogOpen(false);
    setNotice(`${config.action} quedó registrado correctamente.`);
    window.setTimeout(() => setNotice(""), 2800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {menuOpen && <button aria-label="Cerrar menú" className="fixed inset-0 z-30 bg-overlay lg:hidden" onClick={() => setMenuOpen(false)} />}
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-sidebar p-4 transition-transform lg:sticky lg:top-0 lg:h-screen ${menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-brand"><Building2 className="size-6" /></div>
            <div className="min-w-0"><p className="font-display text-xl font-extrabold leading-none">Residencias Albor</p><p className="mt-1 text-xs font-bold text-muted-foreground">Portal de administración</p></div>
            <Button aria-label="Cerrar menú" size="icon" variant="ghost" className="ml-auto rounded-full lg:hidden" onClick={() => setMenuOpen(false)}><X /></Button>
          </div>
          <div className="mt-4 rounded-2xl bg-secondary p-3">
            <p className="text-xs font-extrabold text-muted-foreground">COPROPIEDAD ACTIVA</p>
            <div className="mt-1 flex items-center justify-between"><span className="text-sm font-extrabold">Reserva del Bosque</span><ChevronRight className="size-4 text-muted-foreground" /></div>
          </div>
          <nav className="mt-4 flex-1 overflow-y-auto pr-1" aria-label="Módulos principales">
            <div className="mb-3"><p className="px-3 pb-1 text-[10px] font-extrabold uppercase text-muted-foreground">Otras vistas</p><Link to="/residente" className="mb-0.5 flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-sidebar-foreground hover:bg-accent"><Home className="size-4" />Portal residente</Link><Link to="/porteria" className="mb-0.5 flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-sidebar-foreground hover:bg-accent"><ShieldCheck className="size-4" />Portal portería</Link></div>
            {groups.map((group) => (
              <div key={group} className="mb-3">
                <p className="px-3 pb-1 text-[10px] font-extrabold uppercase text-muted-foreground">{group}</p>
                {modules.filter((item) => item.group === group).map((item) => {
                  const Icon = item.icon;
                  const active = config.key === item.key;
                  const common = `mb-0.5 flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition-colors ${active ? "bg-primary text-primary-foreground shadow-brand" : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"}`;
                  return item.key === "dashboard" ? (
                    <Link key={item.key} to="/" onClick={() => setMenuOpen(false)} className={common}><Icon className="size-4" />{item.label}</Link>
                  ) : (
                    <Link key={item.key} to="/$module" params={{ module: item.key }} onClick={() => setMenuOpen(false)} className={common}><Icon className="size-4" />{item.label}</Link>
                  );
                })}
              </div>
            ))}
          </nav>
          <div className="mt-2 flex items-center gap-3 rounded-2xl bg-secondary p-3"><div className="grid size-10 place-items-center rounded-full bg-rose-soft font-display font-extrabold text-rose-foreground">CG</div><div><p className="text-sm font-extrabold">Carlos Andrés García</p><p className="text-xs font-semibold text-muted-foreground">Administrador</p></div><Settings className="ml-auto size-4 text-muted-foreground" /></div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-20 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-xl md:px-7">
            <Button aria-label="Abrir menú" size="icon" variant="ghost" className="rounded-full lg:hidden" onClick={() => setMenuOpen(true)}><Menu /></Button>
            <div className="relative hidden max-w-md flex-1 sm:block"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input aria-label="Buscar en el módulo" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Buscar en ${config.label.toLocaleLowerCase("es")}…`} className="h-11 w-full rounded-full border-0 bg-card pl-11 pr-4 text-sm font-semibold shadow-soft outline-none ring-primary/30 transition focus:ring-2" /></div>
            <div className="ml-auto flex items-center gap-2"><Button aria-label="Notificaciones" variant="secondary" size="icon" className="relative rounded-full"><Bell /><span className="absolute right-1 top-1 size-2 rounded-full bg-destructive" /></Button><Button onClick={() => setDialogOpen(true)} className="rounded-full shadow-brand"><Plus /><span className="hidden sm:inline">{config.action}</span></Button></div>
          </header>

          <div className="mx-auto max-w-[1480px] p-4 md:p-7">
            <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-xs font-extrabold uppercase text-primary">Reserva del Bosque · Bogotá</p><h1 className="mt-1 font-display text-3xl font-extrabold md:text-4xl">{config.key === "dashboard" ? "Buenos días, Carlos" : config.label}</h1><p className="mt-1 max-w-2xl text-sm font-semibold text-muted-foreground">{config.description}</p></div>
              <div className="flex gap-2"><Button variant="secondary" className="rounded-full"><Download /> Exportar</Button><Button variant="outline" className="rounded-full"><SlidersHorizontal /> Filtros</Button></div>
            </section>
            <div className="mt-5 sm:hidden"><div className="relative"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input aria-label="Buscar en el módulo" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar…" className="h-11 w-full rounded-full border-0 bg-card pl-11 pr-4 text-sm font-semibold shadow-soft outline-none ring-primary/30 focus:ring-2" /></div></div>

            {config.key === "dashboard" ? <Dashboard onAction={() => setDialogOpen(true)} /> : <ModuleView config={config} rows={filteredRows} query={query} />}
          </div>
        </main>
      </div>

      {notice && <div role="status" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-2xl bg-success px-4 py-3 text-sm font-extrabold text-success-foreground shadow-elevated"><CheckCircle2 className="size-5" />{notice}</div>}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-3xl border-0 bg-card shadow-elevated">
          <DialogHeader><DialogTitle className="font-display text-2xl font-extrabold">{config.action}</DialogTitle><DialogDescription>Completa los datos básicos para continuar. Esta versión utiliza información de demostración.</DialogDescription></DialogHeader>
          <div className="grid gap-4 py-2"><label className="grid gap-1.5 text-sm font-bold">Unidad<input className="h-11 rounded-xl bg-secondary px-3 outline-none ring-primary/30 focus:ring-2" placeholder="Ej. A-402" /></label><label className="grid gap-1.5 text-sm font-bold">Detalle<input className="h-11 rounded-xl bg-secondary px-3 outline-none ring-primary/30 focus:ring-2" placeholder="Escribe una descripción" /></label><label className="grid gap-1.5 text-sm font-bold">Observaciones<textarea className="min-h-24 rounded-xl bg-secondary p-3 outline-none ring-primary/30 focus:ring-2" placeholder="Información adicional" /></label></div>
          <DialogFooter><Button variant="secondary" className="rounded-full" onClick={() => setDialogOpen(false)}>Cancelar</Button><Button className="rounded-full" onClick={action}>Guardar registro</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ModuleView({ config, rows, query }: { config: ModuleConfig; rows: string[][]; query: string }) {
  const [selected, setSelected] = useState<string[] | null>(null);
  return (
    <>
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {config.metrics.map(([label, value, note], index) => <article key={label} className="rounded-3xl bg-card p-5 shadow-soft"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold uppercase text-muted-foreground">{label}</p><p className="mt-2 font-display text-2xl font-extrabold">{value}</p></div><span className={`grid size-10 shrink-0 place-items-center rounded-2xl ${accentStyles[index]}`}><config.icon className="size-5" /></span></div><p className="mt-2 text-xs font-bold text-muted-foreground">{note}</p></article>)}
      </section>
      <section className="mt-5 overflow-hidden rounded-3xl bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border px-5 py-4"><div><h2 className="font-display text-lg font-extrabold">Vista general</h2><p className="text-xs font-semibold text-muted-foreground">{rows.length} registros {query && `para “${query}”`}</p></div><Button variant="ghost" size="sm" className="rounded-full">Ver opciones <ChevronRight /></Button></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="bg-secondary/70 text-xs font-extrabold uppercase text-muted-foreground">{config.columns.map((column) => <th key={column} className="px-5 py-3">{column}</th>)}<th className="px-5 py-3 text-right">Detalle</th></tr></thead><tbody className="divide-y divide-border">{rows.map((row) => <tr key={row.join("-")} className="transition-colors hover:bg-accent/50">{row.map((cell, index) => <td key={`${cell}-${index}`} className={`px-5 py-4 ${index === 0 ? "font-extrabold" : "font-semibold text-muted-foreground"}`}>{index === row.length - 1 ? <Status value={cell} /> : cell}</td>)}<td className="px-5 py-3 text-right"><Button aria-label={`Ver ${row[0]}`} variant="ghost" size="icon" className="rounded-full" onClick={() => setSelected(row)}><ChevronRight /></Button></td></tr>)}</tbody></table></div>
        {rows.length === 0 && <div className="grid min-h-56 place-items-center p-8 text-center"><div><Search className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 font-extrabold">No encontramos resultados</p><p className="text-sm text-muted-foreground">Prueba con otro nombre, unidad o estado.</p></div></div>}
      </section>
      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="rounded-3xl border-0 bg-card shadow-elevated"><DialogHeader><DialogTitle className="font-display text-2xl font-extrabold">{selected?.[0]}</DialogTitle><DialogDescription>Información detallada del registro seleccionado.</DialogDescription></DialogHeader><div className="grid gap-3 py-2">{selected?.map((value, index) => <div key={`${value}-${index}`} className="flex items-center justify-between rounded-2xl bg-secondary px-4 py-3"><span className="text-xs font-extrabold uppercase text-muted-foreground">{config.columns[index]}</span><span className="text-sm font-extrabold">{value}</span></div>)}</div><DialogFooter><Button className="rounded-full" onClick={() => setSelected(null)}>Cerrar</Button></DialogFooter></DialogContent></Dialog>
    </>
  );
}

export function Status({ value }: { value: string }) {
  const positive = /activo|pagado|confirmada|finalizado|resuelto|publicado|listo|al día|emitida|aplicado|público|residentes/i.test(value);
  const warning = /pendiente|programado|asignado|procesando|actualizar|borrador|por vencer/i.test(value);
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ${positive ? "bg-mint-soft text-mint-foreground" : warning ? "bg-butter-soft text-butter-foreground" : "bg-rose-soft text-rose-foreground"}`}>{value}</span>;
}

function Dashboard({ onAction }: { onAction: () => void }) {
  const metrics = [["Ingresos del mes", "$81,6 M", "+8,4% vs abril", CircleDollarSign], ["Cartera cobrada", "94,2%", "+3,1 puntos", FileBarChart], ["Morosidad", "18 unidades", "$18,5 M en riesgo", TriangleAlert], ["Ocupación", "96,5%", "248 de 256 unidades", Home]] as const;
  return <>
    <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(([label, value, note, Icon], index) => <article key={label} className="rounded-3xl bg-card p-5 shadow-soft"><div className="flex items-start justify-between"><div><p className="text-xs font-extrabold uppercase text-muted-foreground">{label}</p><p className="mt-2 font-display text-2xl font-extrabold">{value}</p></div><span className={`grid size-10 place-items-center rounded-2xl ${accentStyles[index]}`}><Icon className="size-5" /></span></div><p className="mt-2 text-xs font-extrabold text-muted-foreground">{note}</p></article>)}</section>
    <section className="mt-5 grid gap-5 xl:grid-cols-3"><article className="rounded-3xl bg-card p-6 shadow-soft xl:col-span-2"><div className="flex items-center justify-between"><div><h2 className="font-display text-lg font-extrabold">Flujo de caja</h2><p className="text-xs font-semibold text-muted-foreground">Ingresos y egresos · últimos 6 meses</p></div><span className="rounded-full bg-lilac-soft px-3 py-1 text-xs font-extrabold text-lilac-foreground">+ $23,7 M</span></div><div className="mt-7 flex h-48 items-end gap-3 md:gap-6">{[[70,55,"Dic"],[78,60,"Ene"],[64,62,"Feb"],[84,58,"Mar"],[90,66,"Abr"],[96,70,"May"]].map(([income, expense, month]) => <div key={month} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="flex h-36 items-end gap-1.5"><div className="w-3 rounded-full bg-primary md:w-4" style={{height:`${income}%`}}/><div className="w-3 rounded-full bg-peach md:w-4" style={{height:`${expense}%`}}/></div><span className="text-xs font-extrabold text-muted-foreground">{month}</span></div>)}</div><div className="mt-3 flex gap-4 text-xs font-bold text-muted-foreground"><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-primary"/>Ingresos</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-peach"/>Egresos</span></div></article><article className="rounded-3xl bg-card p-6 shadow-soft"><h2 className="font-display text-lg font-extrabold">Pagos recientes</h2><div className="mt-4 space-y-3">{[["A-402", "$320.000", "Pagado"],["B-108", "$365.000", "Pagado"],["C-215", "$320.000", "Pendiente"],["A-310", "$640.000", "En mora"]].map(([unit,value,status]) => <button key={unit} onClick={onAction} className="flex w-full items-center gap-3 rounded-2xl bg-secondary p-3 text-left transition hover:bg-accent"><span className={`grid size-9 place-items-center rounded-xl ${status === "Pagado" ? "bg-mint-soft text-mint-foreground" : status === "Pendiente" ? "bg-butter-soft text-butter-foreground" : "bg-rose-soft text-rose-foreground"}`}>{status === "Pagado" ? <CheckCircle2 className="size-4"/> : status === "Pendiente" ? <Clock3 className="size-4"/> : <TriangleAlert className="size-4"/>}</span><span className="flex-1"><strong className="block text-sm">Apto {unit}</strong><small className="font-bold text-muted-foreground">Cuota mayo</small></span><strong className="text-sm">{value}</strong></button>)}</div></article></section>
    <section className="mt-5 grid gap-5 lg:grid-cols-3"><DashboardCard title="Novedades" icon={ClipboardList} items={["Asamblea ordinaria convocada para el 28 de mayo.","Mantenimiento de piscina programado el sábado.","Contrato de seguridad renovado con VigilPro."]}/><DashboardCard title="Reservas de hoy" icon={CalendarDays} items={["Piscina · 14:00–16:00 · Familia Ríos","Zona BBQ · 18:00–21:00 · Apto 305","Salón social · 19:00–23:00 · Apto C-101"]}/><article className="rounded-3xl bg-card p-6 shadow-soft"><h2 className="font-display text-lg font-extrabold">Indicadores clave</h2><div className="mt-5 space-y-5">{[["Cobranza",94],["Presupuesto usado",71],["PQRS resueltas",88]].map(([label,value]) => <div key={label}><div className="flex justify-between text-xs font-extrabold"><span>{label}</span><span>{value}%</span></div><div className="mt-2 h-3 rounded-full bg-secondary"><div className="h-3 rounded-full bg-primary" style={{width:`${value}%`}}/></div></div>)}</div></article></section>
  </>;
}

function DashboardCard({ title, icon: Icon, items }: { title: string; icon: IconType; items: string[] }) {
  return <article className="rounded-3xl bg-card p-6 shadow-soft"><div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-xl bg-lilac-soft text-lilac-foreground"><Icon className="size-4"/></span><h2 className="font-display text-lg font-extrabold">{title}</h2></div><div className="mt-4 space-y-3">{items.map((item,index) => <div key={item} className="flex gap-3 rounded-2xl bg-secondary p-3"><span className={`mt-1 size-2.5 shrink-0 rounded-full ${index===0 ? "bg-primary" : index===1 ? "bg-peach" : "bg-mint"}`}/><p className="text-sm font-bold leading-snug">{item}</p></div>)}</div></article>;
}

export const moduleTitle = (module?: string) => getModuleConfig(module).label;