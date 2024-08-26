import connectDb from "@/lib/db";
import User from "@/lib/models/user.model";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request) => {
  await connectDb();

  try {
    // const body = await request.json();
    // const userId = body.userId;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Id or newUsername not valid" },
        { status: 400 }
      );
    }
    if (!Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid userId" },
        { status: 400 }
      );
    }
    const user = await User.findByIdAndDelete(new ObjectId(userId));

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting user",
      error,
    });
  }
};
