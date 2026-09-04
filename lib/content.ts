export const profile = {
  name: 'Santino Dacuy',
  role: 'Analista en Sistemas de Información',
  status: 'Estudiante avanzado de la Licenciatura en Sistemas de Información · 4to año, última etapa',
  location: 'Concepción del Uruguay, Entre Ríos, Argentina',
  tagline:
    'Desarrollo full-stack con foco en backend y bases de datos. Buscando mi primera oportunidad profesional en sistemas.',
  email: 'santinodacuy@gmail.com',
  phone: '3442-531963',
  phoneHref: 'tel:+543442531963',
  linkedin: 'https://www.linkedin.com/in/santino-dacuy',
  linkedinLabel: 'Santino Dacuy',
  cv: '/cv-santino-dacuy.pdf',
}

export const about = {
  text: [
    'Analista en Sistemas de Información (UADER) y estudiante avanzado de la Licenciatura en Sistemas de Información, en su última etapa. Perfil de desarrollo full-stack con foco en backend y bases de datos: mi proyecto final de carrera fue una plataforma de e-commerce construida de cero, con integración de pagos (Mercado Pago), CMS headless (Strapi) y autenticación OAuth.',
    'A eso se suma experiencia práctica en bases relacionales, NoSQL y distribuidas, y un proyecto reciente de Business Intelligence y Data Warehousing con Tableau, donde detecté y corregí errores de integridad de datos con impacto medible sobre el análisis.',
    'Tengo historial de liderazgo técnico en proyectos grupales, formación amplia en arquitectura de software, redes y sistemas, e IA aplicada. Busco mi primera oportunidad profesional en sistemas para aportar esta base sólida y seguir creciendo técnicamente.',
  ],
  highlights: [
    {
      kicker: 'Liderazgo técnico',
      value: '5',
      label: 'integrantes',
      text: 'Líder y arquitecto de código en un equipo de 5 personas (proyecto de Redes Neuronales).',
    },
    {
      kicker: 'Tesis en producción',
      value: 'OAuth + MP',
      label: 'integraciones reales',
      text: 'Proyecto de tesis con integración de pagos reales (Mercado Pago) y autenticación con Google OAuth.',
    },
    {
      kicker: 'Calidad de datos',
      value: '2',
      label: 'errores críticos',
      text: 'Detección y corrección de errores críticos de integridad de datos en un Data Warehouse real.',
    },
  ],
}

export type Project = {
  id: string
  index: string
  title: string
  subtitle: string
  year?: string
  kind: string
  description: string
  bullets: string[]
  stack: string[]
  link?: { label: string; href: string }
  findings?: { value: string; count?: number; decimals?: number; suffix?: string; prefix?: string; label: string; text: string }[]
}

export const projects: Project[] = [
  {
    id: 'mate-unico',
    index: '01',
    title: 'Mate Único',
    subtitle: 'E-commerce · Proyecto Final de Carrera (Tesis)',
    kind: 'Tesis',
    description:
      'Plataforma de venta online construida de cero para digitalizar un negocio de mates (productos individuales y combos).',
    bullets: [
      'Frontend en React (Router v6) con historial de compras, deep linking, scroll automático al pedido y estados de pedido con código de colores.',
      'Backend en Node.js/Express sobre PostgreSQL, con modelo relacional normalizado, diccionario de datos y triggers.',
      'Documentación: modelado en UML y prototipado en Figma.',
      'Integraciones: Strapi (CMS del catálogo), API de Mercado Pago (pagos online) y autenticación con Google OAuth.',
    ],
    stack: ['React', 'React Router v6', 'Node.js', 'Express', 'PostgreSQL', 'Strapi', 'Mercado Pago', 'Google OAuth', 'UML', 'Figma'],
  },
  {
    id: 'retail-vision',
    index: '02',
    title: 'Retail Vision',
    subtitle: 'Data Warehouse & Business Intelligence',
    year: '2026',
    kind: 'BI / DW',
    description:
      'Proyecto grupal de la materia Bases de Datos Avanzadas, enfocado en experiencia del cliente y fidelización.',
    bullets: [
      'Modelado dimensional (esquema estrella) en PostgreSQL.',
      'Pipeline ETL completo: staging, DDL/DML, claves subrogadas y reglas de negocio de segmentación de clientes.',
      'Dashboards en Tableau.',
    ],
    stack: ['PostgreSQL', 'Esquema estrella', 'ETL', 'Tableau', 'SQL'],
    findings: [
      {
        value: '1.000 → 1.000.000',
        count: 1000000,
        prefix: '1.000 → ',
        label: 'registros ficticios',
        text: 'Detecté y corregí un CROSS JOIN que inflaba 1.000 filas de encuestas a 1.000.000 de registros.',
      },
      {
        value: '90%',
        count: 90,
        suffix: '%',
        label: 'evaluaciones huérfanas',
        text: 'Problema de integridad referencial: el 90% de las evaluaciones apuntaba a productos inexistentes.',
      },
      {
        value: '~0,04',
        count: 0.04,
        decimals: 2,
        prefix: '~',
        label: 'correlación',
        text: 'Resultado final: correlación casi nula entre el gasto declarado y el gasto real de los clientes.',
      },
    ],
  },
  {
    id: 'airports',
    index: '03',
    title: 'API de Gestión Aeroportuaria',
    subtitle: 'Backend NoSQL · Proyecto individual',
    kind: 'NoSQL',
    description:
      'API REST para gestión de aeropuertos con persistencia NoSQL, geolocalización y ranking de popularidad.',
    bullets: [
      'Backend REST con Node.js/Express y MongoDB como base de datos principal.',
      'Dos instancias de Redis: una para geolocalización (comandos GEO) y otra para ranking de popularidad (con TTL).',
      'Visualización con Leaflet.js y MarkerCluster.',
      'Despliegue con Docker Compose.',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'Redis GEO', 'Redis TTL', 'Leaflet.js', 'MarkerCluster', 'Docker Compose'],
    link: {
      label: 'SantinoDacuy/TP6-Airports-BDDNsql',
      href: 'https://github.com/SantinoDacuy/TP6-Airports-BDDNsql',
    },
  },
  {
    id: 'art1',
    index: '04',
    title: 'Clasificador de Frutas',
    subtitle: 'Red Neuronal ART1 · Trabajo final integrador',
    kind: 'IA',
    description:
      'Trabajo final integrador de Redes Neuronales / IA, bajo supervisión de la Dra. Daniela López De Luise.',
    bullets: [
      'Rol: líder de un grupo de 5 integrantes y arquitecto de código.',
      'Coautor de una propuesta formal con alcances y limitaciones definidos.',
    ],
    stack: ['Redes neuronales', 'ART1', 'Python', 'Liderazgo técnico'],
  },
  {
    id: 'replicacion',
    index: '05',
    title: 'Replicación de Bases de Datos Distribuidas',
    subtitle: 'PostgreSQL · Replicación lógica',
    kind: 'Distribuidas',
    description: 'Arquitectura maestro/esclavos con replicación lógica sobre tres nodos simulados.',
    bullets: [
      'Implementación de replicación lógica maestro/esclavos sobre tres nodos simulados.',
      'Configuración de publicación/suscripción vía pgAdmin.',
    ],
    stack: ['PostgreSQL', 'Publish/Subscribe', 'pgAdmin'],
  },
]

export const skills: { category: string; items: string[] }[] = [
  {
    category: 'Desarrollo',
    items: ['Python (POO, scripts)', 'JavaScript', 'HTML', 'CSS', 'Node.js / Express', 'Flask', 'Git y GitHub', 'Patrones de diseño (Singleton, Observer, Proxy)'],
  },
  {
    category: 'Bases de Datos Relacionales',
    items: ['SQL (PostgreSQL, MySQL, SQLite)', 'Modelado dimensional (esquema estrella)', 'Diseño de ETL (staging, DDL/DML, claves subrogadas)'],
  },
  {
    category: 'Bases de Datos NoSQL y Distribuidas',
    items: ['MongoDB', 'Redis (GEO, sorted sets, TTL)', 'Replicación lógica en PostgreSQL (publish/subscribe)'],
  },
  {
    category: 'Business Intelligence y Datos',
    items: ['Tableau', 'Definición de reglas de negocio', 'Control de calidad e integridad de datos'],
  },
  {
    category: 'Inteligencia Artificial',
    items: ['Redes neuronales', 'Arquitectura ART1'],
  },
  {
    category: 'Redes y Sistemas',
    items: ['Modelo TCP/IP', 'Configuración básica de redes / router', 'Virtualización (VirtualBox)', 'Mantenimiento y diagnóstico de PCs', 'Armado de hardware'],
  },
  {
    category: 'Herramientas',
    items: ['Docker / Docker Compose', 'pgAdmin', 'Leaflet.js', 'GitHub'],
  },
  {
    category: 'Integraciones y APIs de terceros',
    items: ['Mercado Pago (pagos online)', 'Google OAuth (autenticación)', 'Strapi (CMS headless)'],
  },
]

export const education = [
  {
    title: 'Licenciatura en Sistemas de Información',
    org: 'UADER · Facultad de Ciencia y Tecnología · sede Concepción del Uruguay',
    period: 'En curso',
    detail: '2do cuatrimestre de 4to año — última etapa.',
    status: 'En curso' as const,
  },
  {
    title: 'Analista en Sistemas de Información',
    org: 'UADER · Facultad de Ciencia y Tecnología',
    period: 'Mayo 2026',
    detail: 'Graduado.',
    status: 'Graduado' as const,
  },
]

export const complementary = [
  {
    title: 'AWS AI Practitioner',
    org: 'AWS Entrena LATAM',
    period: 'Agosto 2026',
    detail: 'En formación: ruta de preparación para la certificación AWS AI Practitioner. Semana 1 completada (constancia de participación).',
    status: 'En formación' as const,
  },
]

export const languages = [
  { name: 'Inglés', level: 'Lecto-comprensión', detail: 'Formación secundaria y universitaria.' },
]
