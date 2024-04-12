"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { IconBadge } from "../icon-badge";
import { CourseProgress } from "../course-progress";

export const HoverEffect = ({
  items,
  className,
  children,
}: {
  children?: React.ReactNode;
  items: {
    title: string;
    description: string;
    link: string;
    imageUrl: string;
    chaptersLength: number;
    progress: number | null;
    category: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("py-1", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-blue-50 dark:bg-blue-100/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.05 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.05, delay: 0.05 },
                }}
              />
            )}
          </AnimatePresence> */}
          <Card>
            <div className="group transition overflow-hidden rounded-lg h-full">
              <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                  fill
                  className="object-cover"
                  alt={item.title}
                  src={`/images/${item.imageUrl}`}
                />
              </div>
              <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition-all line-clamp-2">
                  {item.title}
                </div>
                <p className="text-xs text-muted-foreground">{item.category}</p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                  <div className="flex items-center gap-x-1 text-slate-500">
                    <IconBadge size="sm" icon={BookOpen} />
                    <span>
                      {item.chaptersLength}{" "}
                      {item.chaptersLength === 1 ? "Chapter" : "Chapters"}
                    </span>
                  </div>
                </div>
                {/* {progress !== null ? ( */}
                <CourseProgress
                  variant={item.progress === 100 ? "success" : "default"}
                  size="sm"
                  value={item.progress as any}
                />
                {/* ) : (
						<p className="text-md md:text-sm font-medium text-slate-700">
						{formatPrice(price)}
						</p>
					)} */}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "transition-all ease-out hover:shadow-sm rounded-2xl h-full w-full overflow-hidden bg-sky-200/20 border border-blue-100 dark:border-white/[0.2] group-hover:border-blue-300 relative z-20",
        className
      )}
    >
      <div className="relative z-50 bg">
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
