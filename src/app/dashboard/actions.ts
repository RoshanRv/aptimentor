"use server";

import { prisma } from "@/lib/prisma.utils";
import type { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUser = async (user: Partial<Omit<User, "id" | "name">>) => {
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: { ...user },
  });

  revalidatePath("/dashboard");
};
