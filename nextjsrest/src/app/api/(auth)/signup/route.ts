import connectDb from "@/lib/db";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

// working with signup a single user
export const POST = async (request: Request) => {
  await connectDb();
  const body = await request.json();
  try {
    console.log(body);
    const user = await new User(body);
    await user.save();
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user, error:",
      error,
    });
  }
};
