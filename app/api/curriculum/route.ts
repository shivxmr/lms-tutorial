import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    const curriculum = await db.curriculum.create({
      data: {
        title,
      },
    });

    return NextResponse.json(curriculum);
  } catch (error) {
    console.log("[CURRICULUM]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const curriculums = await db.curriculum.findMany();

    return NextResponse.json(curriculums);
  } catch (error) {
    console.log("[CURRICULUM]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
