export interface Skill {
  name: string;
  color: string;
  level: number; // 0-5
  tag: string;
  certification?: {
    name: string;
    issuer: string;
    url?: string;
    image?: string;
  };
}

export const skills: Skill[] = [
  { name: "Java", color: "#E76F00", level: 5, tag: "Language" },
  { name: "JavaScript", color: "#F7DF1E", level: 4, tag: "Language" },
  { name: "TypeScript", color: "#3178C6", level: 4, tag: "Language" },
  { name: "HTML & CSS", color: "#E44D26", level: 4, tag: "Language" },
  { name: "Spring", color: "#6DB33F", level: 4, tag: "Framework" },
  { name: "PostgreSQL", color: "#336791", level: 3, tag: "Database" },
  { name: "MySQL", color: "#4479A1", level: 3, tag: "Database" },
  { name: "Claude", color: "#D97757", level: 3, tag: "AI", certification: { name: "Claude Code - The Practical Guide", issuer: "Udemy · Academind", url: "https://ude.my/UC-101a87f3-0b14-403b-9bc4-fd418b2f9376", image: "/projects/certificado claude code.jpg" } },
];
