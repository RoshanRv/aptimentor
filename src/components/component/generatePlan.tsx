import {
  logicalTopics,
  quantitativeTopics,
  verbalTopics,
} from "@/lib/constants";
import { Sparkles, X } from "lucide-react";
import React, { useState } from "react";
import { DatePicker } from "../ui/datepicker";
import { Button } from "../ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Props = {
  setShowModal: (val: false) => void;
};

const GeneratePlan = ({ setShowModal }: Props) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState("");

  const handleSelect = (topic: string) => {
    selectedTopics.includes(topic)
      ? setSelectedTopics((e) => e.filter((top) => top !== topic))
      : setSelectedTopics((e) => [...e, topic]);
  };

  const handleGenerate = async () => {
    setLoading(true);
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Generate a schedule for learning the following aptitude topics within the given deadline.
    Table Column will be Topic, Start Date, End Date, Hours Per Day.
    NOTE: The response should be in HTML Table with Borders and Good Padding and inline CSS.
    Topics:${selectedTopics.toString()}
    Deadline:${date}
    Today's Date: ${new Date()}
    `;
    const response = await model.generateContent(prompt);
    setSchedule(
      response.response.text().replace("```html", "").replace("```", "")
    );
    setLoading(false);
  };

  return (
    <section className="bg-white shadow-lg p-6 max-h-[80vh] overflow-auto rounded-lg flex flex-col gap-2 relative lg:w-7/12 md:w-10/12 w-11/12">
      <h2 className="text-center text-3xl font-semibold">Generate Plan</h2>
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3"
      >
        <X />
      </button>
      <h4 className="text-xl font-medium">1. Select Topic</h4>
      <h4 className="text-lg ">Quantitative Aptitude</h4>
      <div className="flex gap-2 items-center flex-wrap">
        {quantitativeTopics.map((topic) => (
          <Topic
            key={topic}
            topic={topic}
            selectedTopics={selectedTopics}
            onClick={handleSelect}
          />
        ))}
      </div>
      <h4 className="text-lg">Logical Reasoning</h4>
      <div className="flex gap-2 items-center flex-wrap">
        {logicalTopics.map((topic) => (
          <Topic
            key={topic}
            topic={topic}
            selectedTopics={selectedTopics}
            onClick={handleSelect}
          />
        ))}
      </div>
      <h4 className="text-lg">Verbal Ability</h4>
      <div className="flex gap-2 items-center flex-wrap">
        {verbalTopics.map((topic) => (
          <Topic
            key={topic}
            topic={topic}
            selectedTopics={selectedTopics}
            onClick={handleSelect}
          />
        ))}
      </div>
      <h4 className="text-xl font-medium">2. Select Deadline</h4>
      <div className="relative">
        <DatePicker date={date} setDate={setDate} />
      </div>
      {/* Response */}
      {schedule && <div dangerouslySetInnerHTML={{ __html: schedule }} />}

      <Button
        onClick={handleGenerate}
        className="grd-bg mt-auto font-semibold text-lg"
        size={"lg"}
      >
        <div className="flex items-center gap-3 ">
          {loading ? (
            <div className="animate-loading rounded-full h-3 w-3 bg-white"></div>
          ) : (
            <>
              Generate Plan
              <Sparkles width={20} height={20} />
            </>
          )}
        </div>
      </Button>
    </section>
  );
};

export default GeneratePlan;

interface TopicProps {
  topic: string;
  selectedTopics: string[];
  onClick: (topic: string) => void;
}

const Topic = ({ topic, selectedTopics, onClick }: TopicProps) => {
  return (
    <p
      onClick={() => onClick(topic)}
      className={`px-2 py-1 rounded-lg text-xs cursor-pointer select-none ${
        selectedTopics.includes(topic)
          ? "bg-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      {topic}
    </p>
  );
};
