import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import LiveCount from "@/components/ui/LiveCount";
import MagneticButton from "@/components/ui/MagneticButton";
import CipherReveal from "@/components/ui/CipherReveal";
import { Reveal } from "@/components/ui/Reveal";

const links = [
  {
    label: "Email",
    // TODO: reemplazar con tu email real
    href: "mailto:tu-email@ejemplo.com",
    icon: HiOutlineMail,
  },
  {
    label: "LinkedIn",
    // TODO: reemplazar con tu URL de LinkedIn
    href: "#",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    // TODO: reemplazar con tu URL de GitHub
    href: "#",
    icon: SiGithub,
  },
];

export function Contact() {
  return (
    <section
      id="contacto"
      className="flex flex-col items-center gap-8 border-t border-border-default/60 px-6 py-32 text-center sm:px-16"
    >
      <Reveal className="flex flex-col items-center gap-8 w-full" width="100%">
        <h2 className="font-display text-3xl font-semibold text-primary">
          <CipherReveal text="Hablemos" />
        </h2>

        <p className="max-w-md text-secondary">
          ¿Tenés un proyecto en mente o querés charlar sobre backend y
          datos? Escribime.
        </p>

        <div className="flex gap-6 mt-4">
          {links.map(({ label, href, icon: Icon }) => (
            <MagneticButton key={label} radius={30} strength={3}>
              <a
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-border-default bg-surface text-secondary shadow-sm transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon className="h-5 w-5" />
              </a>
            </MagneticButton>
          ))}
        </div>

        <LiveCount />

        <p className="mt-16 text-xs font-medium uppercase tracking-[0.2em] text-secondary/50">
          © 2026 Santino
        </p>
      </Reveal>
    </section>
  );
}
