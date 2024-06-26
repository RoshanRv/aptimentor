"use client";

import { ReactNode, useState } from "react";

const MCQ = ({
  choices,
  ques,
  ansIndex,
  quiz,
  setAns,
}: {
  ques: string;
  choices: (string | null | undefined)[];
  ansIndex: number | null | undefined;
  quiz?: boolean;
  setAns?: (val: number) => void;
}) => {
  const [selectedAns, setSelectedAns] = useState<null | number>(null);
  return (
    <>
      <h2 className="text-lg font-medium">{ques}</h2>
      <div className="grid grid-cols-2 gap-2">
        {choices.map((choice, i) => (
          <Opt
            ansIndex={ansIndex}
            selectedAns={selectedAns}
            setSelectedAns={setSelectedAns}
            setAns={setAns}
            index={i}
            key={choice}
            quiz={quiz}
          >
            {choice}
          </Opt>
        ))}
      </div>
    </>
  );
};

export default MCQ;

interface OptTypes {
  children: ReactNode;
  index: number;
  selectedAns: number | null;
  setSelectedAns: (ans: number | null) => void;
  ansIndex: number | null | undefined;
  quiz?: boolean;
  setAns?: (val: number) => void;
}

export const Opt = ({
  children,
  index,
  ansIndex,
  selectedAns,
  setSelectedAns,
  quiz,
  setAns,
}: OptTypes) => {
  const isCorrect = ansIndex === selectedAns && selectedAns === index && !quiz;

  return (
    <div
      onClick={() => (setSelectedAns(index), setAns && setAns(index))}
      className={`rounded-sm cursor-pointer relative flex  ${
        isCorrect
          ? "bg-emerald-300"
          : selectedAns === index && !quiz
          ? "bg-red-300"
          : selectedAns === index && quiz
          ? "bg-gray-200"
          : "hover:bg-gray-100"
      }  overflow-hidden  transition-all`}
    >
      <p className="px-2 py-1 bg-black text-white font-semibold">{index + 1}</p>
      <p className="px-2 py-1  w-full font-medium">{children}</p>
    </div>
  );
};
