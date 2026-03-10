export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
  category?: string;
  icon: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    slug: "my-portfolio",
    title: "My Portfolio",
    thumbnail: "/projects/portfolio-app.gif",
    description:
      "Personal developer portfolio built with Next.js, React, and Tailwind CSS.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    sourceUrl: "https://github.com/tquaresmadev/my-portfolio",
    category: "Web App",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    accentColor: "#6366f1",
  },
  {
    slug: "bananini",
    title: "Bananini",
    thumbnail: "/projects/bananini-app.gif",
    description:
      "Fun and interactive app with playful design and smooth animations.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    category: "Web App",
    icon: "M12 2a10 10 0 110 20 10 10 0 010-20zm0 4a1 1 0 00-1 1v5a1 1 0 002 0V7a1 1 0 00-1-1z",
    accentColor: "#f59e0b",
  },
];
