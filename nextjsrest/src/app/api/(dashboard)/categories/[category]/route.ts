import connectDb from "@/lib/db";
import Category from "@/lib/models/category";
import User from "@/lib/models/user.model";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { types } from "util";

//
// Update a single category.
//

export const PATCH = async (
  request: Request,
  context: { params: any }
) => {
  try {
    const categoryId = context.params.category; // cateogry is the name of this directory so we can access it by name category!
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const body = await request.json();
    const { title } = body;
    console.log(title);

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Missing or Invalid user id" },
        { status: 404 }
      );
    }
    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { message: "Missing or Invalid category id" },
        { status: 404 }
      );
    }
    await connectDb();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "user not found in the databse" },
        { status: 404 }
      );
    }
    const category = await Category.findOne({
      _id: categoryId,
      user: userId,
    });
    if (!category) {
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 }
      );
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title },
      { new: true }
    );
    return NextResponse.json(
      { message: "Category updated successfully", updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "internel server error while updating category",
        error,
      },
      { status: 500 }
    );
  }
};

//
// delete category,
//

export const DELETE = async (
  request: Request,
  context: { params: any }
) => {
  const categoryId = context.params.category; // cateogry is the name of this directory so we can access it by name category!
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Missing or Invalid user id" },
        { status: 404 }
      );
    }
    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { message: "Missing or Invalid category id" },
        { status: 404 }
      );
    }
    await connectDb();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "user not found in the databse" },
        { status: 404 }
      );
    }

    const category = await Category.findOne({
      _id: categoryId,
      user: userId,
    });

    if (!category) {
      return NextResponse.json(
        {
          message:
            "category not found in the database or not belog to the user",
        },
        { status: 404 }
      );
    }
    await Category.findByIdAndDelete(categoryId);
    return NextResponse.json(
      { message: "category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "internel server error while deleting category",
        error,
      },
      { status: 500 }
    );
  }
};
