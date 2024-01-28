import Image from "next/image";
import HEROBG from "@/assets/home-bg.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type Props = {};

const NotFound = (props: Props) => {
  return (
    <section className="w-full h-screen flex justify-center items-center  relative   ">
      <div className="flex flex-col gap-12 w-10/12 lg:w-1/2">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="lg:text-8xl text-4xl mb-4 font-semibold">
            Page Not Found
          </h1>
        </div>
        <Link href={"/"} className="w-max px-10 mx-auto py-6 ">
          <Button size={"lg"} className="text-lg font-semibold">
            Home
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
