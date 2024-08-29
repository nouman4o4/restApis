import connectDb from "@/lib/db";
import Category from "@/lib/models/category";
import User from "@/lib/models/user.model";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connectDb();
    const { title } = await request.json();
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
        { status: 404 }
      );
    }

    const newCategory = new Category({
      title,
      user: new Types.ObjectId(userId),
    });
    await newCategory.save();

    return NextResponse.json(
      { message: "Category is created successfully!", newCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "internel server error while creating category",
        error,
      },
      { status: 500 }
    );
  }
};
