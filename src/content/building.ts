import type { BuildingProject } from "./types";

/**
 * Projects in incubation. Shown in the header "Building" dropdown,
 * the mobile menu, and the console `building` command.
 */
export const building: BuildingProject[] = [
  {
    id: "project-1",
    title: "Project one",
    stage: "",
    description:
      ".",
    liveUrl: "",
    codeUrl: "",
    leafIcon: true,
  },
  {
    // PLACEHOLDER: replace with my second project
    id: "project-2",
    title: "Project two",
    stage: "Incubating",
    description: "Name and details coming soon.",
  },
  {
    // PLACEHOLDER: replace with my third project
    id: "project-3",
    title: "Project three",
    stage: "Incubating",
    description: "Name and details coming soon.",
  },
];
