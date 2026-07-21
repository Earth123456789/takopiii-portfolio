import { EducationItem } from "@/types/education";

export const getEducationData = (
  t: (key: string) => string | string[],
): EducationItem[] => [
  {
    title: t("education.triamudom") as string,
    period: t("education.triamudomPeriod") as string,
    detail: t("education.triamudomDetail") as string,
    image: `/images/tun.png`,
    status: t("education.status.success") as string,
  },
  {
    title: t("education.kmitl") as string,
    period: t("education.kmitlPeriod") as string,
    detail: t("education.kmitlDetail") as string,
    image: `/images/it.webp`,
    status: t("education.status.success") as string,
  },
];
