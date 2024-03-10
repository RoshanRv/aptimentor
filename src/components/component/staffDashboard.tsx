import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const StaffDashboard = ({ user }: Props) => {
  return (
    <div>
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
    </div>
  );
};

export default StaffDashboard;
