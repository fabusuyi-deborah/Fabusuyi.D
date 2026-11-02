import Image from "next/image";
import type { BuildingProject } from "@/content/types";

export function BuildingIcon({ project }: { project: BuildingProject }) {
  if (project.icon) {
    return (
      <Image
        src={project.icon}
        alt=""
        width={44}
        height={44}
        className="size-11 rounded-md object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`block size-11 rounded-md ${
        project.leafIcon ? "leaf-icon" : "border border-dashed border-line bg-bg-2"
      }`}
    />
  );
}
