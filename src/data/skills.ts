export interface Skill {
  name: string;
  color: string;
  level: number; // 0-5
}

export interface SkillCategory {
  label: string;
  translationKey: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    translationKey: "skills.cat.languages",
    skills: [
      { name: "Java", color: "#E76F00", level: 4 },
      { name: "JavaScript", color: "#F7DF1E", level: 4 },
      { name: "HTML & CSS", color: "#E44D26", level: 4 },
      { name: "SQL", color: "#336791", level: 3 },
    ],
  },
  {
    label: "Frameworks & Tools",
    translationKey: "skills.cat.frameworksTools",
    skills: [{ name: "Spring Boot", color: "#6DB33F", level: 3 }],
  },
];
