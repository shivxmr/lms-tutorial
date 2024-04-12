import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./search-input";

export const NavbarRoutes = async ({ pathname }: any) => {
	const isTeacherPage = pathname?.startsWith("/teacher");
	const isCoursePage = pathname?.includes("/courses");
	const isSearchPage = pathname === "/search";

	return (
		<>
			{isSearchPage && (
				<div className="hidden md:block">
					<SearchInput />
				</div>
			)}
			<Link href="/">
				<Button
					size="sm"
					variant="link">
					Home
				</Button>
			</Link>
			<div className="flex gap-x-2 ml-auto">
				{isTeacherPage || isCoursePage ? (
					<Link href="/">
						<Button
							size="sm"
							variant="ghost">
							Exit
						</Button>
					</Link>
				) : null}
			</div>
		</>
	);
};
