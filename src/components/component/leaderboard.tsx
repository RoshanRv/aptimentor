import type { User } from "@prisma/client";
import React, { ReactNode } from "react";
import LEADERBOARD from "@/assets/leaderboard.webp";
import Image from "next/image";

type Props = {
  user: User;
};

const ranks = [
  {
    name: "XXX",
    Aptitude: 10,
    Logical: 15,
    Verbal: 40,
  },
  {
    name: "YYY",
    Aptitude: 10,
    Logical: 15,
    Verbal: 40,
  },
  {
    name: "YYY",
    Aptitude: 10,
    Logical: 15,
    Verbal: 40,
  },
  {
    name: "YYY",
    Aptitude: 10,
    Logical: 15,
    Verbal: 40,
  },
  {
    name: "YYY",
    Aptitude: 10,
    Logical: 15,
    Verbal: 40,
  },
  {
    name: "YYY",
    Aptitude: 10,
    Logical: 15,
    Verbal: 40,
  },
  {
    name: "YYY",
    Aptitude: 10,
    Logical: 15,
    Verbal: 40,
  },
];

const headers = ["Rank", "Name", "Apt.", "Log.", "Verb."];

const Leaderboard = ({ user }: Props) => {
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
      <div className="grid w-full h-[15rem] px-5 overflow-y-auto grid-cols-[15%,40%,15%,15%,15%] gap-y-1.5">
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
            <Rank rowIndex={i}>{rank.Aptitude}</Rank>
            <Rank rowIndex={i}>{rank.Logical}</Rank>
            <Rank rowIndex={i} last>
              {rank.Verbal}
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
