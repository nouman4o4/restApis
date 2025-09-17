import { Schema, model, Document } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  author?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostDoc extends IPost, Document {}

const PostSchema = new Schema<IPostDoc>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const PostModel = model<IPostDoc>("Post", PostSchema);
