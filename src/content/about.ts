import type { Photo, Talk, TimelineEntry } from "./types";

export const timeline: TimelineEntry[] = [
  { when: "Now", title: "Rank Capital", detail: "Formerly Moni Africa. Building financial products across the stack.", current: true },
  { when: "2025", title: "Outreachy contributor", detail: "Open source: microbiome study curation." },
  { when: "2024 — 2025", title: "AltSchool Africa", detail: "Diploma in Software Engineering, Frontend." },
  { when: "2019 — 2024", title: "University of Ilorin", detail: "B.Sc. Plant Biology. Thesis on GC-MS fingerprinting of mango leaf extract." },
];

/**
 * "Off the screen" gallery. Drop images in /public/images/photos and set `src` + `alt`.
 * Tiles without `src` show a striped placeholder.
 */
export const photos: Photo[] = [
  { category: "speaking", size: "big", title: "DevFest Ilorin", caption: "GDG Ilorin · 2026", src:"/images/photos/speaker_dee.png"},
  { category: "speaking", title: "Speaking at a community event", caption: "Community", src:"/images/photos/speaking1.png", alt:"image of Deborah speaking" },
  { category: "events", title: "She Code Africa Summit", caption: "Lagos · 2026", src:"/images/photos/debby-sca.png", alt:"image of Deborah" },
  { category: "events", size: "wide", title: "Meetups & hackathons", caption: "Community", src:"/images/photos/meetups.jpeg"},
  { category: "life", title: "Reading", caption: "Off the clock", src:"/images/photos/books.jpeg"},
  { category: "life", title: "Over the chessboard", caption: "Off the clock", src:"/images/photos/chess.jpeg" },
];

export const talks: Talk[] = [
  {
    when: "DevFest Ilorin · 2026",
    title: "Becoming a Product Engineer: why “dev” and everything else is blurring",
    description: "GDG Ilorin. For developers at every level, plus curious non-devs.",
    status: "upcoming",
    badge: "Upcoming",
  },
  {
    when: "Girls in Tech · 2026",
    title: "Who builds the algorithm? AI bias and girls in tech",
    description: "Delivered as a visual carousel for a programme for young girls.",
    status: "format",
    badge: "Carousel",
    url: "https://drive.google.com/drive/folders/16ZMdp7JsLnBykOnf02xginFhcILGMuNE?usp=sharing",
  },
];
