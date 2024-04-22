"use client";

import { Sparkles } from "lucide-react";
import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "../ui/button";

type Props = {
  question: {
    question: string | null;
    opt1: string | null;
    opt2: string | null;
    opt3: string | null;
    opt4: string | null;
    ans: string | null;
  };
};

const AskAI = ({ question }: Props) => {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const responseRef = useRef<HTMLDivElement | null>(null);

  const handleAsk = async () => {
    setLoading(true);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate explanation for given question and answer option.
    Question: ${question.question}
    Options: [${question.opt1 || ""},${question.opt2 || ""},${
      question.opt3 || ""
    },${question.opt4 || ""}]
    Answer: ${question.ans ? parseInt(question.ans) + 1 : ""}
    `;
    const response = await model.generateContent(prompt);
    setAiResponse(response.response.text());
    setLoading(false);
  };

  const handleWdithOverflow = () => {
    if (responseRef.current) {
      // const heightOverflow = responseRef.current.scrollHeight > responseRef.current.clientHeight
      const widthOverflow =
        responseRef.current.scrollWidth > responseRef.current.clientWidth;

      if (widthOverflow) return ["0%", "0%"];
    }
  };

  return (
    <div className="relative">
      <button
        onClick={aiResponse ? () => setAiResponse("") : () => handleAsk()}
        className="grd-bg p-2  rounded-md"
      >
        <Sparkles color="white" />
      </button>
      {/* Response */}
      {loading || aiResponse ? (
        <div
          ref={responseRef}
          className="bg-white rounded-md border    p-3 right-0 w-[25vw]  shadow-lg z-50 absolute top-full translate-y-2"
        >
          {loading ? (
            <div className="animate-loading rounded-full h-3 w-3 bg-black"></div>
          ) : (
            <div className="flex flex-col gap-2 max-h-80 overflow-auto">
              <p className=" w-full   whitespace-pre-wrap ">{aiResponse}</p>
              <div className="flex gap-2">
                <Button
                  onClick={handleAsk}
                  size={"sm"}
                  className="w-full  font-semibold"
                >
                  Regenerate
                </Button>
                <Button
                  onClick={() => setAiResponse("")}
                  size={"sm"}
                  variant={"secondary"}
                  className="w-full  font-semibold"
                >
                  Okie, Thanks
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AskAI;
