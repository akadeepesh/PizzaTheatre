import { clerkClient } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { role, userId } = req.body;

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      role,
    },
  });

  res.status(200).json({ success: true });
}
