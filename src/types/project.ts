export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  technologies: string[];
  liveDemo: string;
  featured?: boolean;
}
