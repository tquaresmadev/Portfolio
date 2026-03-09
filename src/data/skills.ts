export interface Skill {
  name: string;
  color: string;
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    skills: [
      { name: "Java", color: "#E76F00" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "HTML & CSS", color: "#E44D26" },
      { name: "SQL", color: "#336791" },
    ],
  },
  {
    label: "Frameworks & Tools",
    skills: [{ name: "Spring Boot", color: "#6DB33F" }],
  },
];
