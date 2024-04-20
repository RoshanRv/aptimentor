import React, { ReactNode } from "react";
import LEADERBOARD from "@/assets/leaderboard.webp";
import Image from "next/image";
import type { Questions, Solved, User } from "@prisma/client";

type Props = {
  user: User;
  allStudents: (User & { solved: (Solved & { question: Questions })[] })[];
};

// const ranks = [
//   {
//     name: "XXX",
//     Aptitude: 10,
//     Logical: 15,
//     Verbal: 40,
//   },
//   {
//     name: "YYY",
//     Aptitude: 10,
//     Logical: 15,
//     Verbal: 40,
//   },
//   {
//     name: "YYY",
//     Aptitude: 10,
//     Logical: 15,
//     Verbal: 40,
//   },
//   {
//     name: "YYY",
//     Aptitude: 10,
//     Logical: 15,
//     Verbal: 40,
//   },
//   {
//     name: "YYY",
//     Aptitude: 10,
//     Logical: 15,
//     Verbal: 40,
//   },
//   {
//     name: "YYY",
//     Aptitude: 10,
//     Logical: 15,
//     Verbal: 40,
//   },
//   {
//     name: "YYY",
//     Aptitude: 10,
//     Logical: 15,
//     Verbal: 40,
//   },
// ];

const headers = ["Rank", "Name", "Apt.", "Log.", "Verb."];

const Leaderboard = ({ user, allStudents }: Props) => {
  const ranks: {
    name: string;
    aptitude: number;
    logical_reason: number;
    verbal_ability: number;
  }[] = [];

  allStudents.forEach((stud) => {
    const studMark = {
      name: stud.name,
      aptitude: 0,
      logical_reason: 0,
      verbal_ability: 0,
    };
    stud.solved.forEach((solv) => {
      studMark[solv.question.type] = studMark[solv.question.type] + 1;
    });
    ranks.push(studMark);
  });

  return (
    <section className="bg-white py-5 rounded-lg h-full shadow-lg flex flex-col gap-2 relative w-full">
      {/* Image */}
      <Image
        src={LEADERBOARD}
        alt="leaderboard"
        className="absolute -right-10 -top-10"
        height={130}
        width={130}
      />
      <h1
        className="text-xl font-semibold text-center
      "
      >
        Leaderboard
      </h1>
      <p className="whitespace-nowrap capitalize text-center text-sm">{`${user?.batch} Batch | ${user?.dept} Dept.`}</p>
      {/* table */}
      <div className="grid w-full  px-5 overflow-y-auto grid-cols-[15%,40%,15%,15%,15%] gap-y-1.5">
        {/* Header */}
        <>
          {headers.map((head) => (
            <p
              className="py-1 border-b  border-gray-500 text-sm font-semibold"
              key={head}
            >
              {head}
            </p>
          ))}
        </>
        {/* Students */}
        {ranks.map((rank, i) => (
          <>
            <Rank rowIndex={i} first>
              {i + 1}
            </Rank>
            <Rank rowIndex={i}>{rank.name}</Rank>
            <Rank rowIndex={i}>{rank.aptitude}</Rank>
            <Rank rowIndex={i}>{rank.logical_reason}</Rank>
            <Rank rowIndex={i} last>
              {rank.verbal_ability}
            </Rank>
          </>
        ))}
      </div>
      {/* My Rank */}
      <div className="grid grid-cols-[15%,40%,15%,15%,15%] font-semibold border  border-gray-800 mx-3 p-2 rounded-md">
        <p>?</p>
        <p>{user.name}</p>
        <p>{10}</p>
        <p>{10}</p>
        <p>{10}</p>
      </div>
    </section>
  );
};

export default Leaderboard;

const Rank = ({
  children,
  first,
  last,
  rowIndex,
}: {
  children: ReactNode;
  first?: boolean;
  last?: boolean;
  rowIndex: number;
}) => (
  <p
    className={`py-1 text-gray-700 text-sm font-medium   ${
      first && "rounded-l-md pl-2"
    } ${last && "rounded-r-md"} ${
      rowIndex == 0
        ? "bg-[#FFD700]"
        : rowIndex == 1
        ? "bg-[#C0C0C0]"
        : rowIndex == 2
        ? "bg-[#cd7f32]/70"
        : "bg-gray-50"
    } `}
  >
    {children}
  </p>
);
