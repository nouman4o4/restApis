import connectDb from "@/lib/db";
import Category from "@/lib/models/category";
import User from "@/lib/models/user.model";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Missing or Invalid user id" },
        { status: 400 }
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "User not found in the databse" },
        { status: 400 }
      );
    }

    const categories = await Category.find({
      user: new Types.ObjectId(userId),
    });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "internel server error while fetching categories",
        error,
      },
      { status: 500 }
    );
  }
};
