import NewUser from "@/components/component/newUser";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import PROGRESS from "@/assets/growth.png";
import VERSUS from "@/assets/versus.webp";
import PLAN from "@/assets/calendar.webp";
import CLOCK from "@/assets/clock.webp";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma.utils";
import { Sparkles } from "lucide-react";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/dashboard");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) redirect("/");

  const isNewUser = !user.institution;

  if (isNewUser) return <NewUser username={user.name} email={user.email} />;

  return (
    <main className="pt-20 pb-2 px-3 lg:px-6">
      {/*  1st Row*/}
      <div className="flex gap-4 mt-14">
        {/* Progress */}
        <div className="bg-white p-3 rounded-lg shadow-lg w-full  relative">
          {/* Graph */}
          <div className="w-full   relative ">
            {/* profile Pic */}
            <div className="h-28 w-28 bg-white absolute flex justify-center items-center rounded-full -translate-y-[75%] left-10 ">
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
            <div className="absolute top-0 left-44 flex flex-col -translate-y-full py-4">
              <h1 className="text-lg font-semibold">{user.name}</h1>
              <h1 className="text-base font-semibold capitalize">
                {`${user.institution} | ${user.role}`}
              </h1>
            </div>
          </div>
          {/* Growth */}
          <Image
            src={PROGRESS}
            alt="progress"
            className="absolute -bottom-5 -right-5"
            height={150}
            width={150}
          />
        </div>
        {/* Challenge */}
        <div className="bg-white p-3 rounded-lg shadow-lg flex flex-col gap-2 relative w-max">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Challenge Users</h1>
            <Image
              alt="dual"
              src={VERSUS}
              height={120}
              width={120}
              className="mx-auto"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Button
              className="font-semibold text-lg mx-auto w-full "
              size={"lg"}
            >
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
        {/* Plan */}
        <div className="bg-white p-3 rounded-lg shadow-lg flex  flex-col gap-2 relative">
          <div className="flex justify-between gap-2">
            <h1 className="text-xl whitespace-nowrap font-semibold">
              Generate Plan
            </h1>
            <Image
              alt="plan"
              src={PLAN}
              height={130}
              width={130}
              className=" translate-x-6 absolute right-0 -translate-y-20"
            />
          </div>
          <div className="flex flex-col gap-2 text-sm mt-2 h-full ">
            <p className="text-gray-600">
              your personalized roadmap to success! Set your learning goals by
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
            <Button
              className="grd-bg mt-auto font-semibold text-lg"
              size={"lg"}
            >
              <div className="flex items-center gap-3 ">
                Generate
                <Sparkles width={20} height={20} />
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="bg-white p-3 rounded-lg shadow-lg flex flex-col gap-2 relative ">
          {/* Clock Icon */}
          <Image
            src={CLOCK}
            width={120}
            height={120}
            alt="clock"
            className="absolute left-0 -translate-x-10 top-0 -translate-y-10"
          />
          <h1 className="text-xl font-semibold pl-14">Daily Quizz</h1>
          <div className="flex flex-col gap-3">
            <p className="font-medium mt-4 ">
              Topic: <span className="font-normal">Simple Interest</span>
            </p>
            <h2 className="text-lg font-medium">{`A sum amounts to Rs 1065 at simple interest rate of 7.5% per annum after 3 years. Find the sum.`}</h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
