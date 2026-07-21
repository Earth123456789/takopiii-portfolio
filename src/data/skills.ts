export interface SkillCategory {
  title: string;
  categoryKey: "frontend" | "backend" | "tools";
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend & UI Engine",
    categoryKey: "frontend",
    skills: [
      "React",
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML Canvas",
    ],
  },
  {
    title: "Backend & Data Systems",
    categoryKey: "backend",
    skills: [
      "Node.js",
      "Express",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "REST & GraphQL",
    ],
  },
  {
    title: "Tools & Ecosystem",
    categoryKey: "tools",
    skills: ["Git", "Docker", "Vercel", "Postman", "Figma", "Linux / Bash"],
  },
];
