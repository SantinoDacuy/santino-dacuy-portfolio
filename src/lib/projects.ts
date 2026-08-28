export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

// TODO: reemplazar descripciones con el copy final una vez definido en Figma.
export const projects: Project[] = [
  {
    slug: "retail-vision",
    title: "Retail Vision",
    description:
      "Data Warehouse y BI para retail: esquema estrella con cuatro tablas de hechos, pipeline ETL completo en PostgreSQL y dashboards en Tableau.",
    stack: ["PostgreSQL", "ETL", "Tableau"],
    featured: true,
  },
  {
    slug: "tp6-airports",
    title: "TP6 Airports",
    description:
      "API full-stack de aeropuertos con MongoDB, dos instancias de Redis (consultas geo y popularidad con TTL), Node/Express y mapas con Leaflet.",
    stack: ["MongoDB", "Redis", "Node.js", "Express", "Docker"],
    githubUrl: "https://github.com/SantinoDacuy/TP6-Airports-BDDNsql",
  },
  {
    slug: "tfi-redes-neuronales",
    title: "TFI Redes Neuronales",
    description:
      "Clasificador de frutas basado en ART1 (Carpenter-Grossberg), como líder de arquitectura de código en un grupo de cinco personas.",
    stack: ["Python", "Redes neuronales"],
  },
];
