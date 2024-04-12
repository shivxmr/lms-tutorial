"use client";

import {
	BarChart,
	Compass,
	FlaskConical,
	FolderOpenDot,
	Layout,
	List,
	LogOut,
	Tornado,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { Button } from "@/components/ui/button";

const guestRoutes = [
	{
		icon: Layout,
		label: "Dashboard",
		href: "/",
	},
	{
		icon: Compass,
		label: "Courses",
		href: "/search",
	},
	{
		icon: Tornado,
		label: "Curriculum",
		href: "/curriculum",
	},
	{
		icon: FlaskConical,
		label: "Labs",
		href: "/labs",
	},
	{
		icon: FolderOpenDot,
		label: "Projects",
		href: "/projects",
	},
	{
		icon: LogOut,
		label: "Logout",
		href: "/logout",
	},
];

const teacherRoutes = [
	{
		icon: List,
		label: "Courses",
		href: "/teacher/courses",
	},
	{
		icon: BarChart,
		label: "Analytics",
		href: "/teacher/analytics",
	},
];

export const SidebarRoutes = () => {
	const pathname = usePathname();

	const isTeacherPage = pathname?.includes("/teacher");

	const routes = isTeacherPage ? teacherRoutes : guestRoutes;

	return (
		<div className="flex h-full flex-col  w-full">
			{routes.map((route) => (
				<SidebarItem
					key={route.href}
					icon={route.icon}
					label={route.label}
					href={route.href}
				/>
			))}
		</div>
	);
};
