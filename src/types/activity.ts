export interface ActivityItem {
  title: string;
  period: string;
  role: string;
  description: string;
  type: "academic" | "event" | "work";
  featured?: boolean;
}

export interface ActivityProps {
  activityData: ActivityItem[];
  showAll?: boolean;
}
