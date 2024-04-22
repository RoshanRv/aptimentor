"use server";

import usePrismaClient from "@/store/usePrismaClient";
import { QuestionType } from "@prisma/client";

export const addQuestion = async (
  formData: FormData,
  type: string,
  ans: string | null
) => {
  try {
    await usePrismaClient.getState().prisma.questions.create({
      data: {
        question: formData.get("question") as string,
        ans: ans,
        type: type as QuestionType,
        opt1: formData.get("opt1") as string,
        opt2: formData.get("opt2") as string,
        opt3: formData.get("opt3") as string,
        opt4: formData.get("opt4") as string,
        topic: formData.get("topic") as string,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const getAllQuestions = async () => {
  try {
    return await usePrismaClient.getState().prisma.questions.findMany();
  } catch (err) {
    throw err;
  }
};
