import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { db } from "@/lib/db";
import path from "path";
import { getLocalSession } from "@/actions/get-session";

export async function DELETE(
	req: Request,
	{ params }: { params: { courseId: string; attachmentId: string } }
) {
	try {
		const session = await getLocalSession();
		const userId = session?.session?.user?.id;
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const courseOwner = await db.course.findUnique({
			where: {
				id: params.courseId,
				userId: userId,
			},
		});

		if (!courseOwner) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const attachment = await db.attachment.delete({
			where: {
				courseId: params.courseId,
				id: params.attachmentId,
			},
		});

		return NextResponse.json(attachment);
	} catch (error) {
		console.log("ATTACHMENT_ID", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
