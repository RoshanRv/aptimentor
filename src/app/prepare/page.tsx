"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import MATHS from "@/assets/maths.webp";
import ALPHABETS from "@/assets/alphabets.webp";
import PUZZLE from "@/assets/puzzle.webp";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { InputWithIcon } from "@/components/ui/input";

const quantitative = [
  "Numbers",
  "LCM and HCF",
  "Work and Wages",
  "Pipes and Cisterns",
  "Time Speed Distance",
  "Trains, Boats, and Streams",
  "Percentages",
  "Ratio Proportion and Partnership",
  "Mixtures and Alligation",
  "Algebra",
  "Average",
  "Age",
  "Profit and Loss",
  "Simple Interest",
  "Compound Interest",
  "Mensuration 2D",
  "Mensuration 3D",
  "Trigonometry & Height and Distances",
  "Progressions",
  "Logarithms",
  "Permutation and Combination",
  "Probability",
  "Geometry",
  "Clocks",
  "Calendars",
  "Coding-Decoding",
  "Race",
  "Simplification and Approximation",
];

const verbal = [
  "Passage/Sentence Rearrangement",
  "Error Detection and Correction",
  "Fill in the Blanks",
  "Comprehension Passages",
  "Cloze test",
  "Jumbled words/Paragraphs",
  "Antonyms and synonyms",
  "Idioms and phrases",
  "Vocabulary and grammar",
  "One word Substitution",
];

const logical = [
  "Series: Missing Numbers, Odd One Out",
  "Data Sufficiency",
  "Assumptions and Conclusions, Courses of Action",
  "Puzzles",
  "Syllogism",
  "Cubes",
  "Alphanumeric series",
  "Reasoning Analogy",
  "Blood Relations",
  "Calendars",
  "Clocks",
  "Dices",
  "Deductive Reasoning/Statement Analysis",
];

type Props = {};

const PreparePage = (props: Props) => {
  const topic = useSearchParams().get("topic");
  const [show, setShow] = useState<null | string>(null);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <main className="w-full flex md:flex-row flex-col ">
      {/* Aside */}
      <aside className="h-screen border-r-2 w-[30%] bg-white/10 backdrop-blur-sm pt-20 p-4 overflow-auto flex gap-4 flex-col ">
        <>
          <InputWithIcon
            onClick={() => setOpen(true)}
            icon={
              <kbd className="text-[.7rem] whitespace-nowrap p-1 rounded-md bg-gray-100 border">
                CTRL K
              </kbd>
            }
            placeholder="Search Topics..."
          />

          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search Topics..." />
            <CommandList>
              <CommandEmpty>No topics found.</CommandEmpty>
              <CommandGroup heading="Quantitative Aptitude">
                {quantitative.map((quan, i) => (
                  <Link
                    onClick={() => setOpen(false)}
                    href={`/prepare?topic=${quan}`}
                    key={i}
                  >
                    <CommandItem>{quan}</CommandItem>
                  </Link>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Verbal Ability">
                {verbal.map((verb, i) => (
                  <Link
                    onClick={() => setOpen(false)}
                    href={`/prepare?topic=${verb}`}
                    key={i}
                  >
                    <CommandItem>{verb}</CommandItem>
                  </Link>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Logical Reasoning">
                {logical.map((log, i) => (
                  <Link
                    onClick={() => setOpen(false)}
                    href={`/prepare?topic=${log}`}
                    key={i}
                  >
                    <CommandItem>{log}</CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </>

        <Card
          title="Quantitative Aptitude"
          list={quantitative}
          img={MATHS}
          className="from-sky-200 to-sky-400"
          setShow={setShow}
          show={show}
        />
        <Card
          title="Verbal Ability"
          list={verbal}
          img={ALPHABETS}
          className="from-violet-200 to-violet-400"
          setShow={setShow}
          show={show}
        />
        <Card
          title="Logical Reasoning"
          list={logical}
          img={PUZZLE}
          className="from-pink-200 to-pink-400"
          setShow={setShow}
          show={show}
        />
      </aside>
      {/*  */}
      <section className="w-[70%] pt-20 p-4">
        <h1 className="text-4xl font-bold">{topic || "Preparation"}</h1>
      </section>
    </main>
  );
};

export default PreparePage;

const Card = ({
  list,
  title,
  className,
  img,
  setShow,
  show,
}: {
  title: string;
  list: string[];
  className: string;
  img: StaticImageData;
  show: null | string;
  setShow: (show: string | null) => void;
}) => {
  return (
    <div className="bg-white p-1 rounded-lg cursor-pointer select-none">
      <div
        onClick={() => setShow(show === title ? null : title)}
        className={`w-full p-3 rounded-lg flex gap-4 items-center bg-gradient-to-br ${className} `}
      >
        <Image alt="card" src={img} height={80} width={80} />
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
      </div>
      <div
        className={`grid transition-all  ${
          show === title ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr]"
        }  `}
      >
        <div className="overflow-hidden marker:text-sky-600 list-disc flex flex-col gap-2">
          {list.map((li, i) => (
            <Link href={`/prepare?topic=${li}`} key={i}>
              <li className="text-sm pl-2 hover:underline hover:underline-offset-2">
                {li}
              </li>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
