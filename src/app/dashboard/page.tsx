import Challenge from "@/components/component/challenge";
import DailyQuiz from "@/components/component/dailyQuiz";
import Leaderboard from "@/components/component/leaderboard";
import NewUser from "@/components/component/newUser";
import Plan from "@/components/component/plan";
import UserReport from "@/components/component/userReport";
import { prisma } from "@/lib/prisma.utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import PROGRESS from "@/assets/growth.png";

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
    </main>
  );
};

export default Dashboard;
