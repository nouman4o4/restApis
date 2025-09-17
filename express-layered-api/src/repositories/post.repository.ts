import { PostModel, IPost, IPostDoc } from "../models/post.model";
import { Types } from "mongoose";

export const createPostRepo = async (
  data: IPost
): Promise<IPostDoc> => {
  const doc = await PostModel.create(data);
  return doc;
};

export const findAllPostsRepo = async (): Promise<IPostDoc[]> => {
  return PostModel.find().sort({ createdAt: -1 }).exec();
};

export const findPostByIdRepo = async (
  id: string
): Promise<IPostDoc | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return PostModel.findById(id).exec();
};

export const updatePostRepo = async (
  id: string,
  patch: Partial<IPost>
): Promise<IPostDoc | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return PostModel.findByIdAndUpdate(id, patch, { new: true }).exec();
};

export const deletePostRepo = async (
  id: string
): Promise<boolean> => {
  if (!Types.ObjectId.isValid(id)) return false;
  const res = await PostModel.findByIdAndDelete(id).exec();
  return res != null;
};
