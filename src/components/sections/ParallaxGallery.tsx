"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAMES = [
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    alt: "Sala de servidores",
    caption: "Infraestructura",
    align: "left" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    alt: "Circuito electrónico",
    caption: "Sistemas",
    align: "right" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    alt: "Dashboard de datos",
    caption: "Business Intelligence",
    align: "center" as const,
  },
];

const SCROLL_DISTANCE = 600;
const PARALLAX_LAG = SCROLL_DISTANCE * 0.2;

export function ParallaxGallery() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-parallax-img]");

      items.forEach((img) => {
        const trigger = img.closest("[data-parallax-item]");
        if (!trigger) return;

        gsap.fromTo(
          img,
          { scale: 0.7, opacity: 0, y: 0 },
          {
            scale: 1.2,
            opacity: 1,
            y: -PARALLAX_LAG,
            ease: "power2.out",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: `+=${SCROLL_DISTANCE}`,
              scrub: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Galería con parallax"
      className="parallax-gallery"
    >
      <div className="parallax-gallery__inner">
        {FRAMES.map((frame) => (
          <figure
            key={frame.caption}
            data-parallax-item
            className={`parallax-gallery__item parallax-gallery__item--${frame.align}`}
          >
            <div className="parallax-gallery__frame">
              <div data-parallax-img className="parallax-gallery__img">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(max-width: 768px) 88vw, 520px"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="parallax-gallery__caption">
              {frame.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
