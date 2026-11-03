import type { BuildingProject } from "./types";

/**
 * Projects in incubation. Shown in the header "Building" dropdown,
 * the mobile menu, and the console `building` command.
 */
export const building: BuildingProject[] = [
  {
    id: "plantlens",
    title: "PlantLens",
    stage: "v1 live",
    description:
      "Search African medicinal and food plants by common, scientific or local name (Yoruba, Igbo, Hausa, Swahili, Twi, Fula), with cited traditional uses and cautions.",
    liveUrl: "https://plant-lens-beta.vercel.app/",
    codeUrl: "https://github.com/fabusuyi-deborah/PlantLens",
    icon: "/images/projects/plant-lens.png",
  },
  {
    // PLACEHOLDER: replace with my second project
    id: "nudge",
    title: "Nudge",
    stage: "Incubating",
    description: "Name and details coming soon.",
    locked: true,
  },
  {
    // PLACEHOLDER: replace with my third project
    id: "trellis",
    title: "Trellis",
    stage: "Incubating",
    description: "Name and details coming soon.",
    locked: true,
  },
];
