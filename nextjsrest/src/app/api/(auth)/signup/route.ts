import { NextRequest } from "next/server";

// working with signup a single user
export const POST = async (req: any) => {
  const { username, email, password } = req.body;
};
