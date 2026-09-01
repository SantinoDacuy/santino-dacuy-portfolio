"use client";

import { projects } from "@/lib/projects";
import { SiGithub } from "react-icons/si";
import CipherReveal from "@/components/ui/CipherReveal";
import { useRef, useState, useEffect } from "react";

function HolographicCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused || isMobile) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[20px] border border-border-default bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent group ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
        }}
      />
      
      {/* Subtle grid background that reveals on hover */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

import { Reveal } from "@/components/ui/Reveal";

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="proyectos" className="px-6 py-24 sm:px-16">
      <Reveal>
        <h2 className="mb-12 font-display text-3xl font-semibold text-primary">
          <CipherReveal text="Proyectos" />
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Featured Project */}
          {featured && (
            <HolographicCard className="sm:col-span-2">
              <div className="flex h-full flex-col p-6 sm:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Destacado
                  </span>
                  {featured.githubUrl && (
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver código de ${featured.title} en GitHub`}
                      className="text-secondary transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                    >
                      <SiGithub className="h-6 w-6" />
                    </a>
                  )}
                </div>
                
                <h3 className="mb-3 font-display text-2xl font-medium text-primary">
                  {featured.title}
                </h3>
                <p className="mb-6 max-w-2xl text-secondary">
                  {featured.description}
                </p>
                
                <div className="mt-auto flex flex-wrap gap-2">
                  {featured.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </HolographicCard>
          )}

          {/* Rest of Projects */}
          {rest.map((project) => (
            <HolographicCard key={project.title}>
              <div className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-xl font-medium text-primary">
                    {project.title}
                  </h3>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver código de ${project.title} en GitHub`}
                      className="text-secondary transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                    >
                      <SiGithub className="h-5 w-5" />
                    </a>
                  )}
                </div>
                
                <p className="mb-6 text-sm text-secondary">
                  {project.description}
                </p>
                
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </HolographicCard>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
