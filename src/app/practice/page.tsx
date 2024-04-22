"use client";

import React, { useEffect, useState } from "react";
import { getAllQuestions, updateSolved } from "../question/actions";
import { Questions } from "@prisma/client";
import MCQ from "@/components/component/mcq";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const PracticePage = (props: Props) => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [ans, setAns] = useState<number>();
  const [currentQues, setCurrentQues] = useState(0);
  const router = useRouter();

  const handleGetQuestions = async () => {
    const res = await getAllQuestions();
    setQuestions(res);
  };

  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  useEffect(() => {
    handleGetQuestions();
  }, []);

  const question = questions[currentQues];

  const handleNext = () => {
    if (ans !== undefined) {
      if (ans === parseInt(questions[currentQues].ans!)) {
        setSolvedIds((e) => [...e, questions[currentQues].id]);
      }

      if (questions.length === currentQues + 1) {
        console.log(solvedIds);
        updateSolved("clrx7tnu50000l6k0av2704j4", solvedIds);
        router.push("/dashboard");
      } else setCurrentQues((e) => e + 1);
      setAns(undefined);
    }
  };

  return (
    <main className="w-full h-screen justify-center items-center flex gap-10 flex-col ">
      <h3 className="text-3xl font-semibold">Practice</h3>
      {/* BOX */}
      <div className="p-5 bg-white lg:w-7/12 md:w-9/12 w-11/12 rounded-lg flex flex-col gap-6">
        <h3 className="text-xl font-medium">{`Question: ${currentQues + 1}/${
          questions.length
        }`}</h3>
        <MCQ
          key={question?.id}
          quiz
          ques={`${question?.question}`}
          choices={[
            question?.opt1,
            question?.opt2,
            question?.opt3,
            question?.opt4,
          ]}
          ansIndex={question?.ans ? parseInt(question?.ans) : null}
          setAns={setAns}
        />
        <Button onClick={handleNext}>
          <p>
            {questions.length === currentQues + 1 ? "End Practice" : "Next"}
          </p>
        </Button>
      </div>
    </main>
  );
};

export default PracticePage;
