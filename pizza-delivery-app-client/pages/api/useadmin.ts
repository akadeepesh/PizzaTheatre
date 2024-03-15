import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionClaims } = getAuth(req);

  const role = sessionClaims?.admin;

  return res.status(200).json({ role });
}
