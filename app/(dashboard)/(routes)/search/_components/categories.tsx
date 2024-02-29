"use client";

import { Category } from "@prisma/client";
import {
  FcAddImage,
  FcAndroidOs,
  FcElectronics,
  FcEngineering,
  FcMultipleSmartphones,
  FcServices,
} from "react-icons/fc";
import { FaComputer } from "react-icons/fa6";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": FaComputer,
  "Generative AI": FcElectronics,
  "Android Dev": FcAndroidOs,
  "Machine Learning": FcMultipleSmartphones,
  "Web Development": FcAddImage,
  "Software Development": FcServices,
  "Engineering": FcEngineering,
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}