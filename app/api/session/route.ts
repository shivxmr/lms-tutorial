import { getLocalSession } from "@/actions/get-session";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const session = await getLocalSession();

	if (!session) {
		return new NextResponse(
			JSON.stringify({ status: "fail", message: "You are not logged in" }),
			{ status: 401 }
		);
	}

	return NextResponse.json({
		authenticated: !!session,
		session,
	});
}
