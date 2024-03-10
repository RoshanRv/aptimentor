"use server";

import usePrismaClient from "@/store/usePrismaClient";
import type { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (user: Partial<Omit<User, "id" | "name">>) => {
  try {
    await usePrismaClient.getState().prisma.user.update({
      where: {
        email: user.email,
      },
      data: { ...user },
    });

    revalidatePath("/dashboard");
  } catch (err) {
    throw err;
  }
};

export const getUser = async (email: string) => {
  try {
    const user = await usePrismaClient.getState().prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};
