"use client";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {};

const UserReport = (props: Props) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={250}
      className={"mt-auto mx-auto -translate-x-5"}
    >
      <BarChart
        data={[
          { name: "Sun", Aptitude: 30, Logical: 25, Verbal: 22 },
          { name: "Mon", Aptitude: 20, Logical: 10, Verbal: 22 },
          { name: "Tue", Aptitude: 20, Logical: 10, Verbal: 22 },
          { name: "Wed", Aptitude: 20, Logical: 10, Verbal: 22 },
          { name: "Thur", Aptitude: 20, Logical: 10, Verbal: 22 },
          { name: "Fri", Aptitude: 20, Logical: 10, Verbal: 22 },
          { name: "Sat", Aptitude: 20, Logical: 10, Verbal: 22 },
        ]}
      >
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
