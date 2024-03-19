import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { getLocalSession } from "./get-session";

type CourseWithProgressWithCategory = Course & {
	category: Category | null;
	chapters: { id: string }[];
	progress: number | null;
};

type GetCourses = {
	title?: string;
	categoryId?: string;
};

export const getCourses = async ({
	title,
	categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
	try {
		const session = await getLocalSession();
		const userId = session?.session?.user?.id;

		const courses = await db.course.findMany({
			where: {
				isPublished: true,
				title: {
					contains: title,
				},
				categoryId,
			},
			include: {
				category: true,
				chapters: {
					where: {
						isPublished: true,
					},
					select: {
						id: true,
					},
				},
				purchases: {
					where: {
						userId,
					},
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		const coursesWithProgress: CourseWithProgressWithCategory[] =
			await Promise.all(
				courses.map(async (course) => {
					if (course.purchases.length === 0) {
						return {
							...course,
							progress: null,
						};
					}

					const progressPercentage = await getProgress(userId, course.id);

					return {
						...course,
						progress: progressPercentage,
					};
				})
			);

		return coursesWithProgress;
	} catch (error) {
		console.log("[GET_COURSES]", error);
		return [];
	}
};
