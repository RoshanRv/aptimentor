"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { updateUser } from "@/app/dashboard/actions";
import { Combobox } from "./combobox";

type Props = {
  username: string;
  email: string;
};

const NewUser = ({ username, email }: Props) => {
  const institutions = [
    "Kamaraj College of Engineering & Technology",
    "Mepco Engineering College",
    "Thiyagarajar Engineering College",
    "PSNA Engineering College",
  ];

  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [joiningYear, setJoiningYear] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);

  const handleValidation = () => {
    if (role) {
      if (role === "staff" && institution) return false;
      else if (role === "student" && institution && joiningYear && department)
        return false;
      else return true;
    } else return true;
  };

  const handleUpdateDetails = () => {
    const isError = handleValidation();
    isError
      ? setError(true)
      : (setError(false),
        updateUser({
          email,
          institution,
          dept: department,
          role: role as "staff" | "student",
          batch: joiningYear,
        }));
  };

  return (
    <main className="h-screen flex justify-center items-center">
      <section className="rounded-xl backdrop-blur-[2px] bg-gradient-to-tr w-10/12   md:w-6/12 lg:w-5/12 text-center  flex flex-col gap-4 from-white/60 to-white/30 border-2 border-gray-100 p-6 ">
        <h1 className="text-2xl font-semibold">{`Looks like this is your first time here ${username}`}</h1>
        <p className=" text-gray-700">{`Kindly fill these details`}</p>
        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Role */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-left">{`Role`}</label>
            <Combobox
              label="Role"
              value={role}
              setValue={setRole}
              list={["Staff", "Student"]}
            />
          </div>
          {/* Institution */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-left">{`Institution`}</label>
            <Combobox
              label="Institution"
              value={institution}
              setValue={setInstitution}
              list={institutions}
            />
          </div>
          {/* Depart */}
          {role === "student" && (
            <div className="flex flex-col gap-1">
              <label className="font-medium text-left">{`Department`}</label>
              <Combobox
                label="Department"
                value={department}
                setValue={setDepartment}
                list={[
                  "Aritficial Intelligence & Data Science",
                  "Computer Science & Engineering",
                  "Information Technology",
                  "Electronics & Communication Engineering",
                  "Mechanical Engineering",
                ]}
              />
            </div>
          )}
          {/* Batch */}
          {role === "student" && (
            <div className="flex flex-col gap-1">
              <label className="font-medium text-left">{`Joining Year`}</label>
              <Combobox
                label="Joining Year"
                value={joiningYear}
                setValue={setJoiningYear}
                list={["2018", "2019", "2020", "2021", "2022", "2023"]}
              />
            </div>
          )}
          {error && (
            <p className="text-sm text-red-600">{`Please fill all details`}</p>
          )}
          <Button onClick={() => handleUpdateDetails()}>Submit</Button>
        </div>
      </section>
    </main>
  );
};

export default NewUser;
