"use server";
import { Chapter, Questions } from "@prisma/client";

import { db } from "@/lib/db";
import { AnyCnameRecord } from "dns";

type QuestionWithChapter = Questions & {
  chapter: Chapter | null;
};

type GetQuestions = {
  chapterId?: string;
};

export const getQuestions = async ({
  chapterId,
}: GetQuestions): Promise<any> => {
  try {
    console.log("chapterId inside get-questions: ", chapterId);
    const questions = await db.questions.findMany({
      where: {
        chapterId: chapterId,
      },
    });
    console.log("questions: ", questions);
    return questions;
  } catch (error) {
    console.log("[GET_QUESTIONS]", error);
    return [];
  }
};
