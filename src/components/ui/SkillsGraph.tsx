"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  motionValue,
  useInView,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  SiPython,
  SiNodedotjs,
  SiFlask,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiExpress,
} from "react-icons/si";

const NODES = [
  { id: "python", label: "Python", icon: SiPython, color: "#3776AB", ox: -100, oy: -120 },
  { id: "flask", label: "Flask", icon: SiFlask, color: "#E2E8F0", ox: 50, oy: -100 },
  { id: "nodejs", label: "Node.js", icon: SiNodedotjs, color: "#339933", ox: -120, oy: -20 },
  { id: "express", label: "Express", icon: SiExpress, color: "#E2E8F0", ox: 0, oy: 20 },
  { id: "postgres", label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", ox: -90, oy: 100 },
  { id: "mongodb", label: "MongoDB", icon: SiMongodb, color: "#47A248", ox: 100, oy: 80 },
  { id: "redis", label: "Redis", icon: SiRedis, color: "#DC382D", ox: 140, oy: -30 },
  { id: "docker", label: "Docker", icon: SiDocker, color: "#2496ED", ox: 30, oy: 140 },
];

const EDGES = [
  { from: 0, to: 1 },
  { from: 2, to: 3 },
  { from: 1, to: 4 },
  { from: 3, to: 5 },
  { from: 3, to: 6 },
  { from: 4, to: 7 },
  { from: 5, to: 7 },
  { from: 6, to: 7 },
  { from: 0, to: 5 },
];

function AnimatedEdge({
  fromX,
  fromY,
  toX,
  toY,
  isInView,
  index,
}: {
  fromX: MotionValue<number>;
  fromY: MotionValue<number>;
  toX: MotionValue<number>;
  toY: MotionValue<number>;
  isInView: boolean;
  index: number;
}) {
  const x1 = useTransform(fromX, (val) => val + 200);
  const y1 = useTransform(fromY, (val) => val + 200);
  const x2 = useTransform(toX, (val) => val + 200);
  const y2 = useTransform(toY, (val) => val + 200);

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#skill-edge)"
      strokeWidth="1.25"
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 0.55 } : { opacity: 0 }}
      transition={{ delay: 0.9 + index * 0.06, duration: 0.4 }}
    />
  );
}

export default function SkillsGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const motionNodesRef = useRef(
    NODES.map(() => ({
      x: motionValue(0),
      y: motionValue(0),
      opacity: motionValue(0),
    }))
  );
  const motionNodes = motionNodesRef.current;

  useEffect(() => {
    const apply = () => setIsMobile(window.innerWidth < 768);
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    if (!isInView || isMobile || hasAnimated) return;
    setHasAnimated(true);

    motionNodes.forEach((node, i) => {
      animate(node.opacity, 1, { duration: 0.35, delay: i * 0.04 });
    });

    const expand = window.setTimeout(() => {
      motionNodes.forEach((node, i) => {
        const target = NODES[i];
        animate(node.x, target.ox, { type: "spring", stiffness: 70, damping: 14 });
        animate(node.y, target.oy, { type: "spring", stiffness: 70, damping: 14 });
      });
    }, 450);

    return () => window.clearTimeout(expand);
  }, [isInView, isMobile, hasAnimated, motionNodes]);

  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {NODES.map((node) => (
          <div
            key={node.id}
            className="flex items-center gap-3 rounded-xl border border-border-default bg-surface/50 px-4 py-3 text-sm text-primary backdrop-blur-sm"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${node.color}22` }}
            >
              <node.icon className="h-4 w-4" style={{ color: node.color }} />
            </span>
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[400px] w-full max-w-[400px] overflow-visible"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-default/40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70"
        aria-hidden="true"
      />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 400 400"
      >
        <defs>
          <linearGradient id="skill-edge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--color-accent-strong)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {EDGES.map((edge, i) => (
          <AnimatedEdge
            key={i}
            fromX={motionNodes[edge.from].x}
            fromY={motionNodes[edge.from].y}
            toX={motionNodes[edge.to].x}
            toY={motionNodes[edge.to].y}
            isInView={isInView}
            index={i}
          />
        ))}
      </svg>

      {NODES.map((node, i) => (
        <motion.div
          key={node.id}
          drag
          dragConstraints={{ left: -170, right: 170, top: -170, bottom: 170 }}
          dragElastic={0.08}
          dragMomentum={false}
          onHoverStart={() => setActiveId(node.id)}
          onHoverEnd={() => setActiveId((id) => (id === node.id ? null : id))}
          onDragStart={() => setActiveId(node.id)}
          onDragEnd={() => setActiveId(null)}
          className="absolute left-1/2 top-1/2 z-10 -ml-7 -mt-7 cursor-grab active:cursor-grabbing"
          style={{
            x: motionNodes[i].x,
            y: motionNodes[i].y,
            opacity: motionNodes[i].opacity,
            zIndex: activeId === node.id ? 30 : 10,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.45, delay: i * 0.05 }}
            className="group relative"
          >
            <div
              className="pointer-events-none absolute -inset-2 rounded-full opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-50 group-active:opacity-60"
              style={{ backgroundColor: node.color }}
            />
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-full border border-border-default bg-surface/95 shadow-lg backdrop-blur-md transition-transform duration-200 group-hover:scale-110 group-active:scale-105"
              style={{
                boxShadow:
                  activeId === node.id
                    ? `0 0 0 1px ${node.color}55, 0 8px 24px ${node.color}33`
                    : undefined,
              }}
            >
              <node.icon className="relative z-10 h-6 w-6" style={{ color: node.color }} />
            </div>
            <div
              className={`pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-default/60 bg-surface/95 px-2 py-1 text-[10px] font-medium text-secondary backdrop-blur-sm transition-opacity ${
                activeId === node.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {node.label}
            </div>
          </motion.div>
        </motion.div>
      ))}

      <p className="pointer-events-none absolute -bottom-6 left-0 right-0 text-center text-xs text-secondary/50">
        Podés arrastrar los nodos
      </p>
    </div>
  );
}
