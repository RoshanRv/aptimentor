import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import UserReport from "./userReport";
import PROGRESS from "@/assets/growth.png";
import DailyQuiz from "./dailyQuiz";
import Challenge from "./challenge";
import Plan from "./plan";
import Leaderboard from "./leaderboard";

type Props = {
  user: User;
};

const StudentDashboard = ({ user }: Props) => {
  return (
    <>
      {/*  1st Row*/}
      <div className="flex gap-4 mt-14 flex-wrap lg:flex-nowrap">
        {/* Progress */}
        <div className="bg-white p-5 rounded-lg shadow-lg w-full  relative">
          {/* Graph */}
          <div className="w-full  relative flex flex-col  h-full ">
            <h3 className="text-center text-xl font-semibold ">{`Weekly Progress`}</h3>
            {/* profile Pic */}
            <div className="h-28 w-28 bg-white absolute flex justify-center items-center rounded-full -translate-y-[80%] left-10 ">
              {user.image && (
                <Image
                  alt="dp"
                  src={user.image}
                  height={100}
                  width={100}
                  className=" rounded-full overflow-hidden  "
                />
              )}
            </div>
            {/* Details */}
            <div className="absolute -top-2 left-44 flex flex-col -translate-y-full py-4">
              <h1 className="text-lg font-semibold">{user.name}</h1>
              <h1 className="text-base font-semibold capitalize">
                {`${user.institution} | ${user.role}`}
              </h1>
            </div>
            <UserReport />
          </div>
          {/* Growth */}
          <Image
            src={PROGRESS}
            alt="progress"
            className="absolute -top-20 -right-10"
            height={150}
            width={150}
          />
        </div>
        {/* Daily Question */}
        <DailyQuiz />
      </div>
      {/* 2nd Row */}
      <div className="flex gap-4 mt-4 flex-wrap lg:flex-nowrap">
        {/* Challenge */}
        <Challenge />
        {/* Plan */}
        <Plan />
        {/* Leaderboard */}
        <Leaderboard user={user} />
      </div>
    </>
  );
};

export default StudentDashboard;
