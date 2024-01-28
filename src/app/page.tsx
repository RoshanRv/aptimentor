import Image from "next/image";
import BRAIN from "@/assets/brain.webp";
import BULB from "@/assets/bulb.webp";
import PUZZLE from "@/assets/puzzle.webp";
import GROWTH from "@/assets/growth.png";
import ROCKET from "@/assets/rocket.webp";
import Tiltcard from "@/components/component/tiltcard";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
      {/* Hero */}
      <section className="w-full h-screen flex justify-center items-center  relative   ">
        {/* Hero Content */}
        <div className="flex flex-col gap-12 w-10/12 lg:w-1/2">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="lg:text-8xl text-4xl mb-4 font-semibold">
              Aptimentor
            </h1>
            <h1 className="lg:text-6xl text-2xl font-semibold ">
              <span className="grd-bg-txt ">Master </span>Your Mind
            </h1>
            <h1 className="lg:text-6xl text-2xl font-semibold">
              Elevate Your <span className="grd-bg-txt ">Potential</span>
            </h1>
          </div>
          <p className="text-primary/60 font-semibold">
            Journey to excellence begins. Unleash your cognitive prowess with
            our interactive learning platform designed to sharpen your aptitude,
            logical, and reasoning skills. Embark on a transformative learning
            experience as you tackle challenges, solve real-world problems, and
            join a vibrant community of learners
          </p>
          <Button
            size={"lg"}
            className="w-max px-10 mx-auto py-6 text-lg font-semibold"
          >
            <div className="flex items-center gap-4">
              <p> Get Started</p>
              <Image alt="rocket" src={ROCKET} height={40} width={40} />
            </div>
          </Button>
        </div>
        {/* Cards */}
        <div className="hidden lg:block">
          <Tiltcard className="top-24 left-32 ">
            <Image priority alt="brain" src={BRAIN} height={230} width={230} />
          </Tiltcard>
          <Tiltcard className="bottom-24 right-16 ">
            <Image
              priority
              alt="growth"
              src={GROWTH}
              height={230}
              width={230}
            />
          </Tiltcard>
          <Tiltcard className="bottom-20 left-20 ">
            <Image priority alt="blub" src={BULB} height={230} width={230} />
          </Tiltcard>
          <Tiltcard className="top-32 right-24 ">
            <Image
              priority
              alt="puzzle"
              src={PUZZLE}
              height={230}
              width={230}
            />
          </Tiltcard>
        </div>
      </section>
    </main>
  );
}
