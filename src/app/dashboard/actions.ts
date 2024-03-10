"use server";

import usePrismaClient from "@/store/usePrismaClient";
import type { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (user: Partial<Omit<User, "id" | "name">>) => {
  await usePrismaClient.getState().prisma.user.update({
    where: {
      email: user.email,
    },
    data: { ...user },
  });

  revalidatePath("/dashboard");
};

export const getUser = async (email: string) => {
  const user = await usePrismaClient.getState().prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};
