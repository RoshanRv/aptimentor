import { getUser } from "@/app/dashboard/actions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

type Props = {};

const NavTabs = async (props: Props) => {
  const session = await getServerSession();

  const user =
    session && session?.user && session.user.email
      ? await getUser(session.user.email)
      : undefined;

  return (
    <>
      {user?.role === "staff" ? (
        <>
          <Link
            href={"/question"}
            className="font-semibold cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100/70 backdrop-blur-lg"
          >
            Add Question
          </Link>
        </>
      ) : (
        <>
          <Link
            href={"/prepare"}
            className="font-semibold cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100/70 backdrop-blur-lg"
          >
            Prepare
          </Link>
          <Link
            href={"/practice"}
            className="font-semibold cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100/70 backdrop-blur-lg"
          >
            Practice
          </Link>
        </>
      )}
    </>
  );
};

export default NavTabs;
