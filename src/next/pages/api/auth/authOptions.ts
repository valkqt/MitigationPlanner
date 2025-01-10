import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma/prisma";
export const authOptions = {
  providers: [],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
