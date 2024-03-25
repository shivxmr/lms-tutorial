import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLocalSession } from "@/actions/get-session";

export async function DELETE(
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
				userId: userId,
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

		const deletedCourse = await db.course.delete({
			where: {
				id: params.courseId,
			},
		});

		return NextResponse.json(deletedCourse);
	} catch (error) {
		console.log("[COURSE_ID_DELETE]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { courseId: string } }
) {
	try {
		const { courseId } = params;
		const values = await req.json();
		const session = await getLocalSession();
		const userId = session?.userId;
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await db.course.update({
			where: {
				id: courseId,
				userId,
			},
			data: {
				...values,
			},
		});

		return NextResponse.json(course);
	} catch (error) {
		console.log("[COURSE_ID]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
