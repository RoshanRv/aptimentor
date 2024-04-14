"use client";
import { Questions, Solved } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { isThisWeek } from "date-fns";

type Props = {
  solved: (Solved & { question: Questions })[];
};

const DAYS = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat",
} as const;

type DAYSKEY = keyof typeof DAYS;

const QUESTYPE = {
  aptitude: "Aptitude",
  logical_reason: "Logical",
  verbal_ability: "Verbal",
} as const;

type QUESTYPEKEY = keyof typeof QUESTYPE;

const UserReport = ({ solved }: Props) => {
  const [data, setData] = useState<
    { name: string; Aptitude: number; Logical: number; Verbal: number }[]
  >([]);

  useEffect(() => {
    if (solved.length > 0) {
      const defaultSolved = [
        { name: "Sun", Aptitude: 0, Logical: 0, Verbal: 0 },
        { name: "Mon", Aptitude: 0, Logical: 0, Verbal: 0 },
        { name: "Tue", Aptitude: 0, Logical: 0, Verbal: 0 },
        { name: "Wed", Aptitude: 0, Logical: 0, Verbal: 0 },
        { name: "Thur", Aptitude: 0, Logical: 0, Verbal: 0 },
        { name: "Fri", Aptitude: 0, Logical: 0, Verbal: 0 },
        { name: "Sat", Aptitude: 0, Logical: 0, Verbal: 0 },
      ];

      solved.forEach((solv) => {
        if (isThisWeek(new Date(solv.solvedAt))) {
          defaultSolved[new Date(solv.solvedAt).getDay() as DAYSKEY][
            QUESTYPE[solv.question.type as QUESTYPEKEY]
          ] =
            defaultSolved[new Date(solv.solvedAt).getDay() as DAYSKEY][
              QUESTYPE[solv.question.type as QUESTYPEKEY]
            ] + 1;
        }
      });

      setData(defaultSolved);
    }
  }, [solved]);

  return (
    <ResponsiveContainer
      width="100%"
      height={250}
      className={"mt-auto mx-auto -translate-x-5"}
    >
      <BarChart data={data}>
        <Tooltip
          itemStyle={{
            padding: 1,
          }}
          contentStyle={{
            textTransform: "capitalize",
            color: "black",
            padding: 4,
            fontSize: 14,
            borderRadius: 6,
          }}
        />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Legend />
        <Bar
          dataKey="Aptitude"
          radius={[4, 4, 0, 0]}
          fill="#7dd3fc"
          className="fill-sky-300"
        />
        <Bar
          dataKey="Logical"
          fill="#a78bfa"
          radius={[4, 4, 0, 0]}
          className="fill-violet-400"
        />
        <Bar
          dataKey="Verbal"
          radius={[4, 4, 0, 0]}
          fill="#f472b6"
          className="fill-pink-400"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserReport;
