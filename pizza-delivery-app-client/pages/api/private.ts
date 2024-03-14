import { clerkClient } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;

  await clerkClient.users.updateUserMetadata(userId, {
    unsafeMetadata: {
      isAdmin: false,
      cartItems: [],
    },
  });

  res.status(200).json({ success: true });
}
