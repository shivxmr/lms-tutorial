export { default } from "next-auth/middleware";

export const config = {
	matcher: ["/"],
	// matcher: ["/((?!register|api|login).*)"],
};
