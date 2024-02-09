import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import VERSUS from "@/assets/versus.webp";

type Props = {};

const Challenge = (props: Props) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col gap-2 relative w-max">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Challenge Users</h1>
        <Image
          alt="dual"
          src={VERSUS}
          height={150}
          width={150}
          className="mx-auto"
        />
      </div>
      <div className="flex flex-col gap-2 w-full mt-auto">
        <Button className="font-semibold text-lg mx-auto w-full " size={"lg"}>
          Dual with Friends
        </Button>
        <p className="text-lg font-bold mx-auto">OR</p>
        <Button
          className="font-semibold text-lg mx-auto w-full"
          variant={"secondary"}
          size={"lg"}
        >
          Dual with Strangers
        </Button>
      </div>
    </div>
  );
};

export default Challenge;
