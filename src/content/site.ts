export const site = {
  name: "Deborah Fabusuyi",
  handle: "Dherrbie",
  wordmark: "FABUSUYI.D",
  role: "Frontend Engineer",
  roleLong: "Frontend engineer · technical writer",
  company: "Rank Capital",
  companyNote: "formerly Moni Africa",
  location: "Lagos, Nigeria",
  timeZone: "Africa/Lagos",
  timeZoneLabel: "WAT",
  utcOffset: 1,
  openToWork: true,
  email: "fabusuyideborah03@gmail.com",
  resume: "/deborah-fabusuyi.pdf",
  url: "https://dherrbie.pages.dev/",
  tagline: "building products people rely on, and writing about how they work.",
  intro:
    "Hi, I'm Deborah. I build clean, responsive products with React and TypeScript, and I document them so other people can use them too.",
  description:
    "Deborah Fabusuyi is a frontend engineer and technical writer in Ibadan, Nigeria, building with React, Next.js and TypeScript.",
  activeYears: "2024 — 2026",
  version: "v3.0",
} as const;

export const socials = [
  { label: "GitHub", short: "GH", url: "https://github.com/fabusuyi-deborah", handle: "fabusuyi-deborah" },
  { label: "LinkedIn", short: "LI", url: "https://www.linkedin.com/in/deborah-fabusuyi-b76968236/", handle: "deborah-fabusuyi" },
  { label: "X", short: "X", url: "https://x.com/Debbyiecodes", handle: "@Debbyiecodes" },
  { label: "Hashnode", short: "HN", url: "https://hashnode.com/@Dherrbie", handle: "@Dherrbie" },
] as const;

export const navSections = [
  { id: "works", label: "Works", key: "1" },
  { id: "writing", label: "Writing", key: "2" },
  { id: "about", label: "About", key: "3" },
  { id: "speaking", label: "Speaking", key: "4" },
  { id: "contact", label: "Contact", key: "5" },
] as const;

export const about = {
  lead: "I'm a frontend engineer and technical writer. I build interfaces people can rely on, from fintech dashboards to plant databases, then write the docs that explain them.",
  paragraphs: [
    "I came into tech through self-directed learning after a degree in plant biology. That background still shows: I like systems, careful observation, and writing things down so the next person can reproduce them.",
    "I'm growing into developer advocacy through writing, speaking and community work. Off the clock I'm reading, or losing at chess.",
  ],
  stack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "RTK Query", "Framer Motion", "Tanstack Query", "Git", "Node.js", "Express.js"],
};

/** Shown in the footer and by `cat now.md` in the console */
export const now = [
  "Shipping features at Rank Capital",
  "Expanding plantlens  across Africa",
  "Learning NestJS on the side",
];

export const stackDetail = {
  daily: ["React", "TypeScript", "Tailwind CSS", "RTK Query"],
  also: ["Next.js", "Framer Motion", "Tanstack Query"],
  writing: ["API docs", "release notes", "tutorials"],
  learning: ["Node", "NestJS", "MongoDB"],
};
