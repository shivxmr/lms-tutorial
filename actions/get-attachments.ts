import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
	courseId: string;
	chapterId: string;
}

export const getAttachments = async ({ courseId, chapterId }: GetChapterProps) => {
	try {
		const attachments = await db.attachment.findMany({
			where: {
				courseId,
				chapterId,
			},
		});

		return {
			attachments,
		};
	} catch (error) {
		console.log("[GET_ATTACHMENTS]", error);
		return {
			attachments: [],
		};
	}
};
