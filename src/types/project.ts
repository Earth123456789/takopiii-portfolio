export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  technologies: string[];
  github?: string;
  liveDemo?: string;
  demoVideo?: string;
  featured?: boolean;
}

