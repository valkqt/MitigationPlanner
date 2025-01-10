import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);
export default authHandler;
