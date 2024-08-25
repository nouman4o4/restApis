import connectDb from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/lib/models/user.model";

export const GET = async () => {
  connectDb();
  try {
    const users = await User.find();
    if (users && users.length > 0) {
      return NextResponse.json(users, { status: 200 });
    } else {
      return NextResponse.json({ message: "No users found" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching users" });
  }
};
