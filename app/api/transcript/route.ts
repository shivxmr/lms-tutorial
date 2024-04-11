import { getLocalSession } from "@/actions/get-session";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { id } = await req.json();
		if (!id || typeof id !== "string") {
			throw new Error("Invalid 'id' provided");
		}

		const transcript = await axios.get(
			`https://youtubetranscript.com/?server_vid2=${id}`
		);

		if (transcript.status === 200) {
			return new NextResponse(transcript.data, { status: 200 });
		} else {
			// If the response status is not 200, handle it as an error
			throw new Error(`Unexpected response status: ${transcript.status}`);
		}
	} catch (error) {
		// Log the error and return an internal server error response
		console.error("[TRANSCRIPTION ERROR]:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
