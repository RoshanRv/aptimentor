import Image from "next/image";
import React from "react";
import MCQ from "./mcq";
import { Button } from "../ui/button";
import CLOCK from "@/assets/clock.webp";
import usePrismaClient from "@/store/usePrismaClient";
import { Sparkles } from "lucide-react";
import AskAI from "./askAI";

type Props = {};

const DailyQuiz = async (props: Props) => {
  const question = await usePrismaClient
    .getState()
    .prisma.questions.findUnique({
      where: {
        id: "cltlvikya00012xdboxddteja",
      },
    });

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col gap-2 relative min-w-[30%] ">
      {/* Clock Icon */}
      <Image
        src={CLOCK}
        width={130}
        height={130}
        alt="clock"
        className="absolute right-0 translate-x-10 top-0 -translate-y-10"
      />
      <h1 className="text-xl font-semibold">Daily Quizz</h1>
      <div className="flex flex-col gap-3">
        <p className="font-medium mt-4 ">
          Topic:{" "}
          <span className="font-normal capitalize">{`${
            question?.topic
          } | ${question?.type.split("_").join(" ")}`}</span>
        </p>
        <MCQ
          ques={`${question?.question}`}
          choices={[
            question?.opt1,
            question?.opt2,
            question?.opt3,
            question?.opt4,
          ]}
          ansIndex={question?.ans ? parseInt(question?.ans) : null}
        />
        {/* Btns */}
        <div className="flex gap-3 mt-4">
          <Button className="w-full  font-semibold">Prepare</Button>
          <Button variant={"secondary"} className="w-full  font-semibold">
            Practice
          </Button>
          {question && <AskAI question={question} />}
        </div>
      </div>
    </div>
  );
};

export default DailyQuiz;
