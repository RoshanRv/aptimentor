import Image from "next/image";
import React from "react";
import PLAN from "@/assets/calendar.webp";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

type Props = {};

const Plan = (props: Props) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg flex  flex-col gap-2 relative">
      <div className="flex justify-between gap-2">
        <h1 className="text-xl whitespace-nowrap font-semibold">
          Generate Plan
        </h1>
        <Image
          alt="plan"
          src={PLAN}
          height={100}
          width={100}
          className=" translate-x-3 absolute right-0 -translate-y-12"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm mt-2 h-full ">
        <p className="text-gray-600 text-base">
          Your personalized roadmap to success! Set your learning goals by
          choosing specific topics and a deadline, and let our intelligent
          algorithm create a customized study plan just for you.
        </p>
        <p className="font-semibold text-base">Steps</p>
        <ul className="font-medium list-decimal list-inside text-gray-800">
          <li>Select Topics</li>
          <li>Set a Deadline</li>
          <li>Generate Plan</li>
          <li>Track Progress</li>
        </ul>
        <Button className="grd-bg mt-auto font-semibold text-lg" size={"lg"}>
          <div className="flex items-center gap-3 ">
            Generate
            <Sparkles width={20} height={20} />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Plan;
