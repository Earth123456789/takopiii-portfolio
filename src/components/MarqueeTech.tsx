import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { techItems, TechItem } from "@/data/techStack";

const middle = Math.ceil(techItems.length / 2);
const firstRow = techItems.slice(0, middle);
const secondRow = techItems.slice(middle);

const TechCard: React.FC<TechItem> = ({ img, name }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-24 cursor-pointer overflow-hidden rounded-xl border p-4 transition-colors",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Image
          src={img}
          alt={name}
          width={32}
          height={32}
          className="rounded-full"
          style={{ width: "auto", height: "auto" }}
        />
        <figcaption className="text-sm font-medium text-foreground">
          {name}
        </figcaption>
      </div>
    </figure>
  );
};

export const MarqueeTech: React.FC = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((item) => (
          <TechCard key={item.name} {...item} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((item) => (
          <TechCard key={item.name} {...item} />
        ))}
      </Marquee>
    </div>
  );
};
