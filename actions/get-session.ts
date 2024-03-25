import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const getLocalSession = async () => {
	try {
		const session = await getServerSession(authOptions);
		console.log("Session", session);
		return {
			authenticated: !!session,
			session,
			userId: session?.user?.id,
		};
	} catch (error) {
		console.log({ status: "fail", message: "You are not logged in" });
	}
};
