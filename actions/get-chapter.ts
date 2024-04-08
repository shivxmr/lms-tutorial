"use server";

import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
      // include: {
      //   transcript: true,
      // },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let nextChapter: Chapter | null = null;

    if (chapter.isFree || purchase) {
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const questions = await db.questions.findMany({
      where: { chapterId: chapterId },
    });

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    // const transcript = await db.transcript.findFirst({
    //   where: { chapterId: chapterId },
    // });

    return {
      chapter,
      course,
      nextChapter,
      userProgress,
      purchase,
      questions,
      // transcript,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      nextChapter: null,
      userProgress: null,
      purchase: null,
      questions: null,
      // transcript: null,
    };
  }
};
