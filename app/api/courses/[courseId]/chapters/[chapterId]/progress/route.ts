import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getLocalSession } from "@/actions/get-session";

export async function PUT(
	req: Request,
	{
		params,
	}: {
		params: {
			courseId: string;
			chapterId: string;
		};
	}
) {
	try {
		const session = await getLocalSession();
		const userId = session?.userId;
		const { isCompleted, submissionLink } = await req.json();

		console.log(isCompleted, submissionLink);

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const userProgress = await db.userProgress.upsert({
			where: {
				userId_chapterId: {
					userId,
					chapterId: params.chapterId,
				},
			},
			update: {
				isCompleted,
				submissionLink,
			},
			create: {
				userId,
				chapterId: params.chapterId,
				submissionLink,
				isCompleted,
			},
		});

		return NextResponse.json(userProgress);
	} catch (error) {
		console.log("[CHAPTER_ID_PROGRESS]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
