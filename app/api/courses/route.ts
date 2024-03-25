import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { getLocalSession } from "@/actions/get-session";

export async function POST(req: Request) {
	try {
		const { title } = await req.json();
		const session = await getLocalSession();
		const userId = session?.userId;
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await db.course.create({
			data: {
				userId,
				title,
			},
		});

		return NextResponse.json(course);
	} catch (error) {
		console.log("[COURSES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}

export async function GET() {
	try {
		const session = await getLocalSession();
		const userId = session?.userId;
		if (
			!userId
			// || !isTeacher(userId)
		) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const course = await db.course.findMany();

		return NextResponse.json(course);
	} catch (error) {
		console.log("[COURSES]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
