import type { MetadataRoute } from "next";
import { getAllContentEntries } from "@/app/projects/content";

const siteUrl = "https://jsdesdev.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const contentRoutes = getAllContentEntries().map((entry) => ({
    url: `${siteUrl}/projects/${entry.slug}`,
    lastModified: getLastModified(entry.published),
    changeFrequency: "monthly" as const,
    priority: entry.type === "projects" ? 0.7 : 0.6,
  }));

  return [...staticRoutes, ...contentRoutes];
}

function getLastModified(published?: string) {
  if (!published) {
    return undefined;
  }

  const date = new Date(published);

  return Number.isNaN(date.getTime()) ? undefined : date;
}
