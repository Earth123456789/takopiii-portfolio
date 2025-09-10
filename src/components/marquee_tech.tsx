import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Html",
    img: "/images/logo/html.webp",
  },
  {
    name: "Css",
    img: "/images/logo/css.png",
  },
  {
    name: "Javascript",
    img: "/images/logo/javascript.webp",
  },
  {
    name: "Typescript",
    img: "/images/logo/typescript.png",
  },
  {
    name: "Python",
    img: "/images/logo/python.webp",
  },
  {
    name: "Next.js",
    img: "/images/logo/nextjs.png",
  },
  {
    name: "React",
    img: "/images/logo/react.webp",
  },
  {
    name: "Go",
    img: "/images/logo/go.png",
  },
  {
    name: "Fiber",
    img: "/images/logo/fiber.webp",
  },
  {
    name: "Fastapi",
    img: "/images/logo/fastapi.png",
  },
  {
    name: "Django",
    img: "/images/logo/django.png",
  },
  {
    name: "Node.js",
    img: "/images/logo/nodejs.webp",
  },
  {
    name: "Express.js",
    img: "/images/logo/express.png",
  },
  {
    name: "AWS",
    img: "/images/logo/aws.png",
  },
  {
    name: "Tailwind",
    img: "/images/logo/tailwind.png",
  },
  {
    name: "Shadcn",
    img: "/images/logo/shadcn.webp",
  },
  {
    name: "Postman",
    img: "/images/logo/postman.png",
  },
  {
    name: "Git",
    img: "/images/logo/git.webp",
  },
  {
    name: "Github",
    img: "/images/logo/github.png",
  },
  {
    name: "Docker",
    img: "/images/logo/docker.png",
  },
  {
    name: "Mongo",
    img: "/images/logo/mongodb.png",
  },
  {
    name: "Postgres",
    img: "/images/logo/postgres.png",
  },
  {
    name: "Figma",
    img: "/images/logo/figma.png",
  },

];

const middle = Math.ceil(reviews.length / 2);
const firstRow = reviews.slice(0, middle); // ครึ่งแรก
const secondRow = reviews.slice(middle);   // ครึ่งหลัง


const ReviewCard = ({
  img,
  name,
}: {
  img: string;
  name: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-24 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Image
          src={img}
          alt={name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white text-white">{name}</figcaption>
        </div>
      </div>
    </figure>
  );
};

export function MarqueeTech() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
