import {
  getBatchesOfInstitute,
  getDepartmentsOfInstitute,
} from "@/app/dashboard/actions";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { Combobox } from "./combobox";
import StaffStudentFilter from "./staffStudentFilter";

type Props = {
  user: User;
};

const StaffDashboard = async ({ user }: Props) => {
  const departments = user.institution
    ? await getDepartmentsOfInstitute(user.institution)
    : [];
  const batches = user.institution
    ? await getBatchesOfInstitute(user.institution)
    : [];

  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <div className="flex gap-4 items-center">
        {user.image && (
          <Image
            alt="dp"
            src={user.image}
            height={100}
            width={100}
            className=" rounded-full overflow-hidden  "
          />
        )}
        <div>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <h1 className="text-xl font-semibold capitalize">
            {user.institution}
          </h1>
        </div>
      </div>
      {/* Search & Filter */}
      <StaffStudentFilter departments={departments} batches={batches} />
    </div>
  );
};

export default StaffDashboard;
