export interface Project {
  slug: string;
  title: string;
  color: string;
  media: {
    src: string;
    poster?: string;
    width: number;
    height: number;
  };
  host: string;
  stack: string[];
  highlights: number;
  liveUrl?: string;
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "cv-juicer",
    title: "CV Juicer",
    color: "#f54900",
    media: {
      src: "/projects/cv-juicer-app.mp4",
      poster: "/projects/cv-juicer-app.jpg",
      width: 1280,
      height: 720,
    },
    host: "cvjuicer.com",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Docker", "Claude API"],
    highlights: 3,
    liveUrl: "https://cvjuicer.com",
  },
  {
    slug: "bananini",
    title: "Bananini",
    color: "#f59e0b",
    media: {
      src: "/projects/bananini-app.mp4",
      poster: "/projects/bananini-app.jpg",
      width: 1280,
      height: 720,
    },
    host: "bananini",
    stack: ["Next.js", "Nest.js", "TypeScript", "Tailwind CSS", "Discord.js", "PostgreSQL"],
    highlights: 3,
  },
];

export const featuredProject = projects[0];
