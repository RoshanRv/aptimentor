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
    <ResponsiveContainer width="100%" height={250} className={"mt-auto"}>
      <BarChart
        data={[
          { name: "Sun", aptitude: 30, logical: 25, verbal: 22 },
          { name: "Mon", aptitude: 20, logical: 10, verbal: 22 },
          { name: "Tue", aptitude: 20, logical: 10, verbal: 22 },
          { name: "Wed", aptitude: 20, logical: 10, verbal: 22 },
          { name: "Thur", aptitude: 20, logical: 10, verbal: 22 },
          { name: "Fri", aptitude: 20, logical: 10, verbal: 22 },
          { name: "Sat", aptitude: 20, logical: 10, verbal: 22 },
        ]}
      >
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
        <Bar
          dataKey="aptitude"
          radius={[4, 4, 0, 0]}
          className="fill-sky-300"
        />
        <Bar
          dataKey="logical"
          radius={[4, 4, 0, 0]}
          className="fill-violet-400"
        />
        <Bar dataKey="verbal" radius={[4, 4, 0, 0]} className="fill-pink-400" />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserReport;
