export interface TechItem {
  name: string;
  img: string;
  featured?: boolean;
}

export const techItems: TechItem[] = [
  { name: "Next.js", img: "/images/logo/nextjs.png", featured: true },
  { name: "React", img: "/images/logo/react.webp", featured: true },
  { name: "Typescript", img: "/images/logo/typescript.png", featured: true },
  { name: "Javascript", img: "/images/logo/javascript.webp", featured: true },
  { name: "Tailwind", img: "/images/logo/tailwind.png", featured: true },
  { name: "Node.js", img: "/images/logo/nodejs.webp", featured: true },
  { name: "Python", img: "/images/logo/python.webp", featured: true },
  { name: "Fastapi", img: "/images/logo/fastapi.png", featured: true },
  { name: "Docker", img: "/images/logo/docker.png", featured: true },
  { name: "Postgres", img: "/images/logo/postgres.png", featured: true },
  { name: "Html", img: "/images/logo/html.webp", featured: false },
  { name: "Css", img: "/images/logo/css.png", featured: false },
  { name: "Go", img: "/images/logo/go.png", featured: false },
  { name: "Fiber", img: "/images/logo/fiber.webp", featured: false },
  { name: "Django", img: "/images/logo/django.png", featured: false },
  { name: "Express.js", img: "/images/logo/express.png", featured: false },
  { name: "AWS", img: "/images/logo/aws.png", featured: false },
  { name: "Shadcn", img: "/images/logo/shadcn.webp", featured: false },
  { name: "Postman", img: "/images/logo/postman.png", featured: false },
  { name: "Git", img: "/images/logo/git.webp", featured: false },
  { name: "Github", img: "/images/logo/github.png", featured: false },
  { name: "Mongo", img: "/images/logo/mongodb.png", featured: false },
  { name: "Figma", img: "/images/logo/figma.png", featured: false },
];
