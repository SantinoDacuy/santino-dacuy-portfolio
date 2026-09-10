'use client'

import { useState } from 'react'
import { Network, X, Server, Database, Shield, CreditCard, LayoutTemplate, Cpu, ArrowRight } from 'lucide-react'

type ArchitectureModalProps = {
  projectId: string
  title: string
  isOpen: boolean
  onClose: () => void
}

const architectures: Record<string, {
  tag: string
  overview: string
  nodes: { id: string; label: string; role: string; icon: typeof Server; detail: string }[]
  flows: { from: string; to: string; label: string }[]
}> = {
  'mate-unico': {
    tag: 'E-commerce Fullstack · Arquitectura Desacoplada',
    overview:
      'Sistema de venta online con separación estricta entre capa cliente, orquestador backend, CMS headless y pasarela financiera con webhooks asíncronos.',
    nodes: [
      {
        id: 'client',
        label: 'React Frontend',
        role: 'Client App (SPA)',
        icon: LayoutTemplate,
        detail: 'React Router v6, estado de carrito reactivo, deep linking y UX optimizada.',
      },
      {
        id: 'auth',
        label: 'Google OAuth 2.0',
        role: 'Seguridad e Identidad',
        icon: Shield,
        detail: 'Tokens JWT firmados y verificación de sesiones sin persistencia de claves.',
      },
      {
        id: 'backend',
        label: 'Node.js / Express',
        role: 'API Gateway & Lógica',
        icon: Cpu,
        detail: 'Endpoints REST normalizados, validación de schemas y orquestación de compras.',
      },
      {
        id: 'strapi',
        label: 'Strapi CMS',
        role: 'Headless Content',
        icon: Server,
        detail: 'Gestión desacoplada de stock, categorías, precios y combos de mates.',
      },
      {
        id: 'mp',
        label: 'Mercado Pago API',
        role: 'Pasarela de Cobros',
        icon: CreditCard,
        detail: 'Checkout pro y procesamiento de notificaciones IPN/Webhooks en tiempo real.',
      },
      {
        id: 'db',
        label: 'PostgreSQL',
        role: 'Base Relacional 3FN',
        icon: Database,
        detail: 'Tablas normalizadas, triggers automáticos de auditoría y claves foráneas estrictas.',
      },
    ],
    flows: [
      { from: 'React Frontend', to: 'Google OAuth 2.0', label: 'Autenticación' },
      { from: 'React Frontend', to: 'Node.js / Express', label: 'HTTP / REST' },
      { from: 'Node.js / Express', to: 'Strapi CMS', label: 'Catálogo Sync' },
      { from: 'Node.js / Express', to: 'Mercado Pago API', label: 'Generación de Preferencias' },
      { from: 'Mercado Pago API', to: 'Node.js / Express', label: 'Webhooks (IPN)' },
      { from: 'Node.js / Express', to: 'PostgreSQL', label: 'Transacciones ACID' },
    ],
  },
  'retail-vision': {
    tag: 'Business Intelligence & Data Warehouse',
    overview:
      'Pipeline analítico de datos que transforma transacciones crudas en un esquema dimensional estrella para dashboards ejecutivos sin pérdida de integridad.',
    nodes: [
      {
        id: 'raw',
        label: 'Fuentes Transaccionales',
        role: 'Data Staging',
        icon: Server,
        detail: 'Archivos CSV y logs de ventas, clientes y encuestas de satisfacción.',
      },
      {
        id: 'etl',
        label: 'Pipeline ETL (SQL)',
        role: 'Limpieza y Transformación',
        icon: Cpu,
        detail: 'Validación de integridad referencial, claves subrogadas y corrección de CROSS JOINs.',
      },
      {
        id: 'dw',
        label: 'PostgreSQL DW',
        role: 'Esquema Estrella',
        icon: Database,
        detail: 'Tabla de Hechos de Ventas vinculada a Dimensiones de Tiempo, Cliente y Producto.',
      },
      {
        id: 'bi',
        label: 'Tableau BI',
        role: 'Visualización & Insights',
        icon: LayoutTemplate,
        detail: 'Métricas de retención, correlación de gasto y segmentación RFM.',
      },
    ],
    flows: [
      { from: 'Fuentes Transaccionales', to: 'Pipeline ETL (SQL)', label: 'Ingesta de Datos' },
      { from: 'Pipeline ETL (SQL)', to: 'PostgreSQL DW', label: 'Carga en Esquema Estrella' },
      { from: 'PostgreSQL DW', to: 'Tableau BI', label: 'Consultas Dimensionales OLAP' },
    ],
  },
}

export function ArchitectureModal({ projectId, title, isOpen, onClose }: ArchitectureModalProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  if (!isOpen) return null

  const arch = architectures[projectId]
  if (!arch) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-xl transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="glass relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl shadow-black/80 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 font-mono text-[11px] text-signal">
              <Network className="size-3" />
              Arquitectura de Sistemas
            </span>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{arch.tag}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal de arquitectura"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 text-muted-foreground transition hover:border-signal/40 hover:bg-white/5 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Overview */}
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {arch.overview}
        </p>

        {/* Nodes Grid */}
        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
            // Componentes del Sistema (Click para inspeccionar)
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {arch.nodes.map((node) => {
              const Icon = node.icon
              const isSelected = selectedNode === node.id

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(isSelected ? null : node.id)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                    isSelected
                      ? 'border-signal/70 bg-signal/[0.12] shadow-[0_0_20px_rgba(var(--signal),0.25)]'
                      : 'border-white/5 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-8 place-items-center rounded-lg border border-signal/20 bg-signal/10 text-signal">
                      <Icon className="size-4" />
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {node.role.split(' ')[0]}
                    </span>
                  </div>
                  <h4 className="mt-3 text-sm font-medium text-foreground">{node.label}</h4>
                  <p className="text-xs text-muted-foreground">{node.role}</p>
                  <p className="mt-2.5 border-t border-white/[0.06] pt-2 text-[11px] leading-relaxed text-muted-foreground/90">
                    {node.detail}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Data Flows Flowchart List */}
        <div className="mt-6 rounded-2xl border border-white/5 bg-black/30 p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
            // Flujo de Integración & Datos
          </p>
          <div className="space-y-2">
            {arch.flows.map((f, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground"
              >
                <span className="rounded bg-white/5 px-2 py-0.5 text-foreground">{f.from}</span>
                <ArrowRight className="size-3 text-signal" />
                <span className="rounded bg-white/5 px-2 py-0.5 text-foreground">{f.to}</span>
                <span className="text-[11px] text-signal/80 ml-auto">({f.label})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-xs text-muted-foreground">
          <span>Diseño estructurado según estándares UML & 3FN</span>
          <button
            onClick={onClose}
            className="rounded-full bg-signal px-4 py-1.5 text-xs font-medium text-signal-foreground transition hover:brightness-110"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
