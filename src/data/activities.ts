export const getActivityData = (t: (key: string) => string | string[]) => {
  return t("activity.items") as unknown as Array<{
    title: string;
    period: string;
    role: string;
    description: string;
    type: "academic" | "event" | "work";
  }>;
};
