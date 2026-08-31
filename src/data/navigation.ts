import { CardNavItem } from "@/types/navigation";

export const getNavigationData = (
  t: (key: string) => string | string[],
): CardNavItem[] => [
  {
    label: t("navigation.about") as string,
    bgColor: "linear-gradient(135deg, #A91D3A, #C72C41, #E94560)",
    textColor: "#fff",
    links: [
      {
        label: t("navigation.about") as string,
        href: "#about",
        ariaLabel: "About Me",
      },
      {
        label: t("navigation.education") as string,
        href: "#educate",
        ariaLabel: "About Education",
      },
      {
        label: t("navigation.techStack") as string,
        href: "#stack",
        ariaLabel: "About Tech Stack",
      },
      {
        label: t("navigation.projects") as string,
        href: "#project",
        ariaLabel: "About Projects",
      },
      {
        label: t("navigation.certificates") as string,
        href: "#certificates",
        ariaLabel: "About Certificates",
      },
      {
        label: t("navigation.activity") as string,
        href: "#activity",
        ariaLabel: "About Activities",
      },
      {
        label: t("navigation.contact") as string,
        href: "#contact",
        ariaLabel: "About Contact",
      },
    ],
  },
  {
    label: t("navigation.contact") as string,
    bgColor: "linear-gradient(135deg, #6E1423, #A91D3A, #E94560)",
    textColor: "#fff",
    links: [
      {
        label: "Email",
        href: "mailto:choknantawongvipat@gmail.com",
        ariaLabel: "Send email",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/vipat.choknantawong",
        ariaLabel: "Facebook",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/earth-vipat-a87b092a5/",
        ariaLabel: "LinkedIn",
      },
    ],
  },
];
