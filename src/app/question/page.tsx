"use client";

import { Combobox } from "@/components/component/combobox";
import React, { useRef, useState } from "react";
import { addQuestion } from "./actions";

type Props = {};

const QuestionPage = (props: Props) => {
  const [type, setType] = useState("");
  const [ansIndex, setAnsIndex] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const formRef = useRef<null | HTMLFormElement>(null);

  const handleValidation = async (formdata: FormData) => {
    const topic = formdata.get("topic");
    const question = formdata.get("question");
    const opt1 = formdata.get("opt1");
    const opt2 = formdata.get("opt2");

    if (topic && question && opt1 && opt2 && ansIndex && type) {
      await addQuestion(formdata, type, ansIndex);
      formRef.current?.reset();
      setType("");
      setAnsIndex(null);
    } else {
      setIsInvalid(true);
      setTimeout(() => {
        return setIsInvalid(false);
      }, 5000);
    }
  };

  return (
    <main className="pt-20 pb-2 px-3 lg:px-6 min-h-screen">
      <section className="flex flex-col gap-4 justify-center items-center">
        <h3 className="text-3xl font-semibold ">Add Questions Here !!!!</h3>
        {/* Question Box */}
        {/* Form */}
        <form
          ref={formRef}
          action={handleValidation}
          className="bg-white  p-6 flex flex-col border-2 border-primary gap-3 rounded-lg w-full max-w-[80%]  lg:max-w-[50%]"
        >
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-4 w-full">
              <h4 className="text-lg font-semibold">Question Type</h4>
              {/* Question Type */}
              <Combobox
                setValue={setType}
                value={type}
                label="Select Type"
                list={["aptitude", "logical_reasoning", "verbal_ability"]}
              />
            </div>
            {/* Question Topic */}
            <div className="flex flex-col gap-4 w-full">
              <h4 className="text-lg font-semibold">Topic</h4>
              <input
                type="text"
                name="topic"
                placeholder="Topic"
                className="px-2 py-1.5 placeholder:italic placeholder:text-gray-300  transition-all outline-violet-300 border rounded-sm w-full font-medium"
              />
            </div>
          </div>
          <h4 className="text-lg font-semibold">Question</h4>
          <textarea
            name="question"
            className="outline-sky-300 p-2 font-medium rounded-lg resize-none border w-full placeholder:italic placeholder:text-gray-300"
            placeholder="Type Question Here!!"
          ></textarea>
          <h4 className="text-lg font-semibold">Options</h4>
          {/* Options */}
          <div className="grid grid-cols-2 gap-2">
            {["opt1", "opt2", "opt3", "opt4"].map((opt, index) => (
              <div
                key={opt}
                className={`rounded-sm cursor-pointer relative flex overflow-hidden  transition-all`}
              >
                {/* Option Index */}
                <p
                  onClick={() => setAnsIndex(index.toString())}
                  className={`px-2 py-1  ${
                    index.toString() === ansIndex
                      ? "bg-emerald-500"
                      : "bg-primary/60"
                  }  text-white font-semibold`}
                >
                  {index + 1}
                </p>
                {/* Option Text Field */}
                <input
                  name={opt}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  autoComplete={"off"}
                  className="px-2 py-1 placeholder:italic placeholder:text-gray-300 hover:bg-gray-100 transition-all outline-pink-200 border rounded-sm w-full font-medium"
                />
              </div>
            ))}
          </div>
          {/* Submit */}
          <input
            type="submit"
            value={"Add Question"}
            className="bg-primary px-6 py-2 transition-all cursor-pointer hover:bg-primary/80 text-white font-semibold rounded-md mt-6"
          />
          {isInvalid && (
            <p className="text-red-600 font-medium text-center">{`Please Fill All Details & Select Answer `}</p>
          )}
        </form>
      </section>
    </main>
  );
};

export default QuestionPage;
