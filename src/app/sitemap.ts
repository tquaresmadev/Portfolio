import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// /sitemap.xml: the one page there is, dated to the build.

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
