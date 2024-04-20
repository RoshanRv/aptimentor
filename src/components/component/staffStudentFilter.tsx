"use client";

import React, { useEffect, useState } from "react";
import { Combobox } from "./combobox";
import { getStudentUsingDeptNBatch } from "@/app/dashboard/actions";
import { Questions, Solved, User } from "@prisma/client";
import Leaderboard from "./leaderboard";

const headers = ["Name", "Apt.", "Log.", "Verb."];

type Props = {
  departments: (string | null)[];
  batches: (string | null)[];
};

const StaffStudentFilter = ({ departments, batches }: Props) => {
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [students, setStudents] = useState<
    (User & { solved: (Solved & { question: Questions })[] })[]
  >([]);

  const handleGetStudents = async () => {
    try {
      const studs = await getStudentUsingDeptNBatch(department, batch);

      setStudents(studs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (department && batch) {
      handleGetStudents();
    }
  }, [department, batch]);

  return (
    <>
      <section className="mt-8 flex flex-col gap-4">
        <h4 className="font-semibold text-lg">{`Select Department & Batch `}</h4>
        <div className="flex gap-4 items-center">
          <Combobox
            search={false}
            list={departments as string[]}
            label="Select Department"
            setValue={setDepartment}
            value={department}
          />
          <Combobox
            search={false}
            list={batches as string[]}
            label="Select Batch"
            setValue={setBatch}
            value={batch}
          />
        </div>
        {/* TABLE */}
        <div className="grid w-full  px-5 overflow-y-auto grid-cols-[40%,15%,15%,15%] gap-y-1.5">
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
          {students.map((stud) => {
            let apt = 0;
            let logic = 0;
            let verbal = 0;

            stud.solved.forEach((solv) => {
              if (solv.question.type === "aptitude") apt += 1;
              else if (solv.question.type === "logical_reason") logic += 1;
              else if (solv.question.type === "verbal_ability") verbal += 1;
            });

            return (
              <>
                <h4 className="text-lg font-medium">{stud.name}</h4>
                <h6>{apt}</h6>
                <h6>{logic}</h6>
                <h6>{verbal}</h6>
              </>
            );
          })}
          {/* Students */}
          {/* {ranks.map((rank, i) => (
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
        ))} */}
        </div>
      </section>
    </>
  );
};

export default StaffStudentFilter;
