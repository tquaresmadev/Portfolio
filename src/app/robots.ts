import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// /robots.txt: search engines may visit everything but the contact API.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
