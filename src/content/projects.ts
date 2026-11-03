import type { Project } from "./types";

/**
 * Selected works, in display order. 
 */
export const projects: Project[] = [
  {
    id: "rank",
    title: "Rank Capital",
    repo: "rank",
    status: "work",
    description:
      "Frontend work at Rank (formerly Moni Africa), a Y Combinator-backed Nigerian fintech helping communities and traders save, invest and access capital.",
    tags: ["Next.js", "TypeScript", "Tailwind", "RTK Query"],
    displayUrl: "rank · dashboard",
    liveUrl: "https://www.userank.com/",
    note: "Internal product · private code",
    image: "/images/projects/rank.png",
    placeholder: "rank",
  },
  {
    id: "plantlens",
    title: "PlantLens",
    repo: "PlantLens",
    status: "live",
    description:
      "A plant search app for African medicinal and food plants. Search by common, scientific or local name and get cited traditional uses and cautions.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Python"],
    displayUrl: "plant-lens-beta.vercel.app",
    liveUrl: "https://plant-lens-beta.vercel.app/",
    codeUrl: "https://github.com/fabusuyi-deborah/PlantLens",
    image: "/images/projects/plant-lens.png",
    placeholder: "plant",
  },
  {
    id: "space",
    title: "Space Tourism",
    repo: "Space-travel-tourism",
    status: "live",
    description:
      "A multi-page cinematic site that turns a complex design system into a responsive, accessible, animated experience.",
    tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    displayUrl: "space-travel-tourism.app",
    liveUrl: "https://space-travel-tourism-three.vercel.app/",
    codeUrl: "https://github.com/fabusuyi-deborah/Space-travel-tourism",
    image: "/images/projects/space.png",
    placeholder: "space",
  },
  {
    id: "maison",
    title: "Maison Soleil",
    repo: "Maison-Guest-house",
    status: "live",
    description:
      "A booking-confirmation challenge grown into a guest portal: live weather, a recipe-powered breakfast guide, an OpenStreetMap map of nearby places, and persistent chat.",
    tags: ["React", "TypeScript", "React Router", "MapLibre GL"],
    displayUrl: "maison-soleil.app",
    liveUrl: "https://maison-guest-house-l15c.vercel.app/",
    codeUrl: "https://github.com/fabusuyi-deborah/Maison-Guest-house",
    image: "/images/projects/maison.png",
    placeholder: "maison",
  },
];

export const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  wip: "In progress",
  work: "Now · Work",
};
