import Image from "next/image";
import React from "react";
import MCQ from "./mcq";
import { Button } from "../ui/button";
import CLOCK from "@/assets/clock.webp";

type Props = {};

const DailyQuiz = (props: Props) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col gap-2 relative ">
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
          Topic: <span className="font-normal">Simple Interest | Aptitude</span>
        </p>
        <MCQ
          ques={`A sum amounts to Rs 1065 at simple interest rate of 7.5% per annum after 3 years. Find the sum.`}
          choices={["878.40", "869.38", "869.28", "783.20"]}
          ansIndex={1}
        />
        {/* Btns */}
        <div className="flex gap-3 mt-4">
          <Button className="w-full  font-semibold">Prepare</Button>
          <Button variant={"secondary"} className="w-full  font-semibold">
            Practice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyQuiz;
