"use client";
import { NavbarRoutes } from "@/components/navbar-routes";
import { signOut } from "next-auth/react";
import { MobileSidebar } from "./mobile-sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Navbar = () => {
	const router = useRouter();
	return (
		<div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
			<MobileSidebar />
			<NavbarRoutes />
			<Button
				onClick={() => {
					signOut({ redirect: false });
					localStorage.clear();
					sessionStorage.clear();
					router.push("/login");
				}}>
				Sign Out
			</Button>
		</div>
	);
};
