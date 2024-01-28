"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import Tilt, { ReactParallaxTiltProps } from "react-parallax-tilt";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
} & ReactParallaxTiltProps;

const Tiltcard = ({ children, className, ...props }: Props) => {
  return (
    <Tilt
      glareEnable
      tiltReverse
      glarePosition="all"
      scale={1.1}
      className={twMerge(
        "p-4 rounded-xl  backdrop-blur-[2px] bg-gradient-to-tr from-gray-50/20 to-gray-100/10 border-2 border-gray-100 absolute",
        className
      )}
      {...props}
    >
      {children}
    </Tilt>
  );
};

export default Tiltcard;
