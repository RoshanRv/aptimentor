import { Prisma, PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";
import { createWithEqualityFn } from "zustand/traditional";

interface UsePrismaClientType {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
}

const usePrismaClient = createWithEqualityFn<UsePrismaClientType>()((set) => ({
  prisma: new PrismaClient(),
}));

export default usePrismaClient;
