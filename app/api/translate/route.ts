import { NextResponse } from "next/server";
import { translate } from "@vitalets/google-translate-api";

export async function POST(req: Request) {
	try {
		// Parse the request body
		const { textData, language } = await req.json();
		console.log("Request Body:", req.json());

		// Perform translation
		const translation = await translate(textData, {
			to: language,
		});

		console.log("Translation:", translation.text);

		// Return translated text in JSON response
		return new NextResponse(translation.text, { status: 200 });
	} catch (error) {
		// Log the error and return an internal server error response
		console.error("[TRANSLATION ERROR]:", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
