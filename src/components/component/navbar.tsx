"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session } = useSession();
  const isHomePage = usePathname() === "/";

  return (
    <nav
      className={`px-4 py-3 flex justify-between fixed top-0 left-0 w-full ${
        isHomePage
          ? "backdrop-blur-[2px] bg-gray-50/20"
          : "backdrop-blur-[6px] bg-white/40"
      }   z-50 `}
    >
      <Link href={"/"}>
        <h1 className="font-bold text-2xl">{isHomePage ? "" : "Aptimentor"}</h1>
      </Link>
      <div className="flex gap-10 items-center z-50">
        <Link
          href={"/prepare"}
          className="font-semibold cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100/70 backdrop-blur-lg"
        >
          Prepare
        </Link>
        <Link
          href={"/test"}
          className="font-semibold cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100/70 backdrop-blur-lg"
        >
          Take Test
        </Link>

        {session?.user && session?.user?.image ? (
          <div className="relative group ">
            <div className="relative w-10 h-10 rounded-lg bg-red">
              <Image
                src={session?.user?.image}
                alt="profile"
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div className="scale-0 absolute  group-hover:scale-100 border-2 left-full w-40 translate-y-2 -translate-x-full whitespace-nowrap top-full origin-top-right transition-all bg-white p-3 rounded-md flex flex-col gap-2">
              <p className="w-full">{session.user.name}</p>
              <Button onClick={() => signOut()}>Logout</Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
