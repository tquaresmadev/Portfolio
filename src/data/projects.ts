export interface Project {
  slug: string;
  title: string;
  /** Brand color: tints the card, its labels and the glow under the preview. */
  color: string;
  /** Preview in the browser frame: a video (.mp4/.webm) that loops muted, or an image. */
  media: {
    src: string;
    /** A video's still, shown while it loads and when motion is reduced. */
    poster?: string;
    width: number;
    height: number;
  };
  /** What the browser frame's address bar shows. */
  host: string;
  stack: string[];
  /** How many `project.<slug>.h<n>` highlight strings the locale files define. */
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

/** The project behind the hero's "Now building" tile. */
export const featuredProject = projects[0];
