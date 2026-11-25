import { site } from "@/data/site";
import { certification, skillGroups } from "@/data/skills";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

export const seoTitle = "Full-Stack Developer in Portugal · Tiago Quaresma";

export const seoDescription = [
  "I'm Tiago, a full-stack developer based in Portugal.",
  "I mostly work with Java, Spring, React and TypeScript, and I built CV Juicer.",
  site.available ? "Open to new projects." : "",
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
