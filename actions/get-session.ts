import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const getLocalSession = async () => {
	try {
		const session = await getServerSession(authOptions);
		return {
			authenticated: !!session,
			session,
		};
	} catch (error) {
		console.log({ status: "fail", message: "You are not logged in" });
	}
};
