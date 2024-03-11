import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(
	req: Request,
	{ params }: { params: { courseId: string; chapterId: string } }
) {
	const formData = await req.formData();
	console.log(formData);

	const file = formData.get("file") as File;
	if (!file) {
		return NextResponse.json({ error: "No files received." }, { status: 400 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const filename = file.name.replaceAll(" ", "_");
	console.log(filename);
	try {
		const url: any = path.join(process.cwd(), "public/pdf/" + filename);
		await writeFile(path.join(process.cwd(), "public/pdf/" + filename), buffer);

		const attachment = await db.attachment.create({
			data: {
				url,
				name: url.split("/").pop(),
				courseId: params.courseId,
				chapterId: params.chapterId,
			},
		});

		return NextResponse.json({ Message: "Success", status: 201 });
	} catch (error) {
		console.log("Error occured ", error);
		return NextResponse.json({ Message: "Failed", status: 500 });
	}
}
