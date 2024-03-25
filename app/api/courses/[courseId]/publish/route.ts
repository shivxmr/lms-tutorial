import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLocalSession } from "@/actions/get-session";

export async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const session = await getLocalSession();
		const userId = session?.userId;
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await db.course.findUnique({
			where: {
				id: params.courseId,
				userId,
			},
			include: {
				chapters: {
					include: {},
				},
			},
		});

		if (!course) {
			return new NextResponse("Not found", { status: 404 });
		}

		const hasPublishedChapter = course.chapters.some(
			(chapter) => chapter.isPublished
		);

		if (
			!course.title ||
			!course.description ||
			// || !course.imageUrl
			!course.categoryId ||
			!hasPublishedChapter
		) {
			return new NextResponse("Missing required fields", { status: 401 });
		}

		const publishedCourse = await db.course.update({
			where: {
				id: params.courseId,
				userId,
			},
			data: {
				isPublished: true,
			},
		});

		return NextResponse.json(publishedCourse);
	} catch (error) {
		console.log("[COURSE_ID_PUBLISH]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
