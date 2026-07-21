export interface EducationItem {
  title: string;
  period: string;
  detail: string;
  image: string;
  status?: string;
  featured?: boolean;
}

export interface EducationProps {
  items: EducationItem[];
}

export type TabType = "all" | "education" | "experience";

export interface BackgroundProps {
  educationData: EducationItem[];
  experienceData: EducationItem[];
  showAll?: boolean;
}

export interface EducationStepperProps {
  items: EducationItem[];
  type?: "education" | "experience";
  limitFeatured?: boolean;
}
