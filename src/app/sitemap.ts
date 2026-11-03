import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/terminal`, changeFrequency: "monthly", priority: 0.5 },
  ];
}

export const dynamic = "force-static";
