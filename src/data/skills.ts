export interface SkillGroup {
  /** Its heading is the `about.group.<key>` string in the locale files. */
  key: "server" | "interface" | "data" | "ai";
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { key: "server", items: ["Java", "Spring", "Nest.js", "Node.js"] },
  { key: "interface", items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "HTML & CSS"] },
  { key: "data", items: ["PostgreSQL", "MySQL", "Docker", "Stripe"] },
  { key: "ai", items: ["Claude API", "Claude Code"] },
];

/** The short list on the hero's "Core stack" tile. */
export const coreStack = ["Java", "Spring", "TypeScript", "React", "Next.js", "PostgreSQL", "Docker"];

export const certification = {
  name: "Claude Code — The Practical Guide",
  issuer: "Udemy · Academind",
  url: "https://ude.my/UC-101a87f3-0b14-403b-9bc4-fd418b2f9376",
};
