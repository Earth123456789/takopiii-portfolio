import { EducationItem } from "@/types/education";

export const getExperienceData = (
  t: (key: string) => string | string[],
): EducationItem[] => [
  {
    title: t("experience.skyfrog.title") as string,
    period: t("experience.skyfrog.period") as string,
    detail: t("experience.skyfrog.detail") as string,
    image: `/images/skyfrog-1.png`,
    status: t("experience.status.completed") as string,
    featured: true,
  },
  {
    title: t("experience.taDsa.title") as string,
    period: t("experience.taDsa.period") as string,
    detail: t("experience.taDsa.detail") as string,
    image: `/images/it.webp`,
    status: t("experience.status.completed") as string,
    featured: true,
  },
  {
    title: t("experience.edvisory.title") as string,
    period: t("experience.edvisory.period") as string,
    detail: t("experience.edvisory.detail") as string,
    image: `/images/edvisory.png`,
    status: t("experience.status.completed") as string,
    featured: true,
  },
  {
    title: t("experience.taNoSql.title") as string,
    period: t("experience.taNoSql.period") as string,
    detail: t("experience.taNoSql.detail") as string,
    image: `/images/it.webp`,
    status: t("experience.status.completed") as string,
    featured: false,
  },
  {
    title: t("experience.taDatabase.title") as string,
    period: t("experience.taDatabase.period") as string,
    detail: t("experience.taDatabase.detail") as string,
    image: `/images/it.webp`,
    status: t("experience.status.completed") as string,
    featured: false,
  },
];
