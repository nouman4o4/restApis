import connectDb from "@/lib/db";
import User from "@/lib/models/user.model";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.ObjectId;
export const PATCH = async (request: Request) => {
  try {
    await connectDb();
    const body = await request.json();
    const { userId, newUsername } = body;
    console.log("the body: ", body);

    if (!userId || !newUsername) {
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
    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUsername },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found in the database" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating user",
        error,
      },
      {
        status: 500,
      }
    );
  }
};
