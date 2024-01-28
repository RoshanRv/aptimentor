import Image from "next/image";
import HEROBG from "@/assets/home-bg.webp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      {/* Hero */}
      <section className="w-full h-[80vh] flex justify-center items-center puzz">
        <Image
          alt="hero-bg"
          src={HEROBG}
          className="absolute w-full h-full top-0 left-0 -z-10 "
        />
        <div className="flex flex-col gap-12 w-1/2">
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-7xl mb-4 font-semibold">Aptimentor</h1>
            <h1 className="text-6xl font-semibold ">
              <span className="grd-bg-txt ">Master </span>Your Mind
            </h1>
            <h1 className="text-6xl font-semibold">
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
        </div>
      </section>
    </main>
  );
}
