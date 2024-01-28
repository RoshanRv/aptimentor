"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session } = useSession();

  return (
    <nav className="px-4 py-2 flex justify-between">
      <h1>Aptimentor</h1>
      <div className="flex gap-4 items-center">
        {session?.user ? (
          <Button onClick={() => signOut()}>Logout</Button>
        ) : (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
