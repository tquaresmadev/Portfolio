import { site } from "@/data/site";
import { certification, skillGroups } from "@/data/skills";

/**
 * The site's public address, used for canonical links, link previews, the sitemap and structured data.
 * NEXT_PUBLIC_SITE_URL wins when set (a custom domain); on Vercel the project's production domain is
 * used automatically; local builds fall back to localhost.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

// Search results and link previews show these. The page itself renders English first, so they're in English.
export const seoTitle = "Full-Stack Developer in Portugal · Tiago Quaresma";

export const seoDescription = [
  "Full-stack developer in Portugal building web products end to end with Java, Spring, TypeScript and React.",
  "Creator of CV Juicer.",
  site.available ? "Available for new projects." : "",
]
  .filter(Boolean)
  .join(" ");

export const seoKeywords = [
  "Tiago Quaresma",
  "full-stack developer",
  "programador full-stack",
  "software developer Portugal",
  "freelance developer Portugal",
  "Java developer",
  "Spring",
  "TypeScript",
  "React",
  "Next.js",
  "PostgreSQL",
  "CV Juicer",
];

/** schema.org data that tells search engines who the page is about (rendered as JSON-LD in page.tsx). */
export function structuredData() {
  const person = `${siteUrl}/#person`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": person,
        name: site.name,
        url: siteUrl,
        image: `${siteUrl}/profile.jpg`,
        jobTitle: "Full-Stack Developer",
        email: `mailto:${site.email}`,
        address: { "@type": "PostalAddress", addressCountry: "PT" },
        sameAs: [site.github, site.linkedin],
        knowsAbout: skillGroups.flatMap((group) => group.items),
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: certification.name,
          credentialCategory: "certificate",
          url: certification.url,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        publisher: { "@id": person },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: seoTitle,
        mainEntity: { "@id": person },
      },
    ],
  };
}
