import { db } from "@/lib/db";

interface GetChapterSubmissionProps {
	questionId: string;
	userId: string;
}

export const getSubmissions = async ({
	questionId,
	userId,
}: GetChapterSubmissionProps) => {
	try {
		const submissions = await db.submissions.findMany({
			where: {
				questionId,
				userId,
			},
		});

		return {
			submissions,
		};
	} catch (error) {
		console.log("[GET_SUBMISSIONS]", error);
		return {
			submissions: [],
		};
	}
};
