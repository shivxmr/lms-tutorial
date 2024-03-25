import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import { getLocalSession } from "@/actions/get-session";

export const NavbarRoutes = async ({ pathname }: any) => {
	const session = await getLocalSession();
	const userId = session?.userId;

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
							<LogOut className="h-4 w-4 mr-2" />
							Exit
						</Button>
					</Link>
				) : isTeacher(userId) ? (
					<Link href="/teacher/courses">
						<Button
							size="sm"
							variant="ghost">
							Teacher mode
						</Button>
					</Link>
				) : null}
			</div>
		</>
	);
};

export async function getServerSideProps(context: any) {
	const { pathname } = context.req.url;

	return {
		props: {
			pathname,
		},
	};
}
