/**
 * Shapes for everything the site renders.
 * Both the normal view and the console read from the same content files,
 */

export type ProjectStatus = "live" | "wip" | "work";

export type PlaceholderArt = "rank" | "plant" | "maison" | "space" | "generic";

export interface Project {
  id: string;
  title: string;
  repo: string;
  status: ProjectStatus;
  description: string;
  tags: string[];
  displayUrl: string;
  liveUrl?: string;
  codeUrl?: string;
  note?: string;
  image?: string;
  placeholder: PlaceholderArt;
}

export interface BuildingProject {
  id: string;
  title: string;
  stage: string;
  description: string;
  liveUrl?: string;
  codeUrl?: string;
  icon?: string;
  leafIcon?: boolean;
}

export type WritingPlatform = "Hashnode" | "Dev.to" | "Medium" | "Other";

export interface Article {
  title: string;
  summary: string;
  url: string;
  platform: WritingPlatform;
}

export type TalkStatus = "upcoming" | "past" | "format";

export interface Talk {
  when: string;
  title: string;
  description: string;
  status: TalkStatus;
  badge: string;
  url?: string;
}

export type PhotoCategory = "speaking" | "events" | "life";

export interface Photo {
  category: PhotoCategory;
  title: string;
  caption: string;
  src?: string;
  alt?: string;
  size?: "big" | "wide" | "normal";
}

export interface TimelineEntry {
  when: string;
  title: string;
  detail: string;
  current?: boolean;
}
