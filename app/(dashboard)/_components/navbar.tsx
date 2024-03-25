import { NavbarRoutes } from "@/components/navbar-routes"
import { signOut } from "next-auth/react";
import { MobileSidebar } from "./mobile-sidebar"
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
      <Button onClick={() => signOut()}></Button>
    </div>
  );
}