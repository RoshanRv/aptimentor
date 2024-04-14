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
      include: {
        solved: {
          include: {
            question: true,
          },
        },
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

export const getDepartmentsOfInstitute = async (institution: string) => {
  try {
    const depts = await usePrismaClient.getState().prisma.user.groupBy({
      by: ["dept"],
      where: {
        institution,
        role: "student",
      },
    });
    return depts.map((dept) => dept.dept);
  } catch (err) {
    throw err;
  }
};

export const getBatchesOfInstitute = async (institution: string) => {
  try {
    const batches = await usePrismaClient.getState().prisma.user.groupBy({
      where: {
        institution,
        role: "student",
      },

      by: ["batch"],
    });
    return batches.map((batch) => batch.batch);
  } catch (err) {
    throw err;
  }
};

export const getStudentUsingDeptNBatch = async (
  dept: string,
  batch: string
) => {
  try {
    return await usePrismaClient.getState().prisma.user.findMany({
      where: {
        dept,
        batch,
        role: "student",
      },
      include: {
        solved: {
          include: {
            question: true,
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
};
