# Portfolio de Santino

Base del portfolio personal. Next.js + TypeScript + Tailwind CSS, App Router.

## Estructura

```
src/
  app/
    page.tsx          -> ensambla las secciones en la home
    layout.tsx         -> layout raíz y metadata
    circuito/
      page.tsx          -> ruta separada para el mini-juego (bundle propio)
  components/
    sections/           -> una sección = un componente (Hero, About, Projects, GameTeaser, Contact)
    ui/                  -> componentes reutilizables chicos (vacío por ahora)
  lib/
    projects.ts          -> datos tipados de los proyectos destacados
```

Cada sección vive en su propio archivo a propósito: cuando llegue el diseño
de Figma, se reemplaza el contenido de cada componente sin tocar el resto.

La ruta `/circuito` está separada del resto para que Next.js la compile en
su propio bundle: no pesa en la carga inicial de la home. Ahí va a vivir la
escena de React Three Fiber más adelante.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## Subir a GitHub

```bash
git add .
git commit -m "Base del portfolio: estructura Next.js + TS + Tailwind"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/portfolio.git
git push -u origin main
```

Creá el repo vacío en GitHub antes del último paso (sin README, para que
no choque con el commit local).

## Desplegar en Vercel

1. Entrar a vercel.com y loguearse con la cuenta de GitHub.
2. "Add New Project" -> elegir el repo `portfolio`.
3. Vercel detecta Next.js automáticamente, no hace falta configurar nada.
4. "Deploy". En un par de minutos queda publicado en `tu-usuario.vercel.app`.
5. Cada `git push` a `main` vuelve a desplegar automáticamente.

## Próximos pasos

- [ ] Diseño final en Figma (paleta oscura/morada, tipografía, avatar/foto)
- [ ] Reemplazar el contenido placeholder de cada sección con el diseño real
- [ ] Definir tipografía (`next/font/google` o `next/font/local`)
- [ ] Construir el circuito interactivo en `/circuito` con React Three Fiber
- [ ] Formulario de contacto real (o mailto directo)
