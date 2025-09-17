import * as repo from "../repositories/post.repository";
import { IPost } from "../models/post.model";
import { ApiError } from "../utils/apiError";

export const createPostService = async (payload: IPost) => {
  const existing = (await repo.findAllPostsRepo()).find(
    (p) => p.title === payload.title
  );
  if (existing)
    throw new ApiError(409, "A post with this title already exists");
  return repo.createPostRepo(payload);
};

export const listPostsService = async () => {
  return repo.findAllPostsRepo();
};

export const getPostByIdService = async (id: string) => {
  const post = await repo.findPostByIdRepo(id);
  if (!post) throw new ApiError(404, "Post not found");
  return post;
};

export const updatePostService = async (
  id: string,
  patch: Partial<IPost>
) => {
  const updated = await repo.updatePostRepo(id, patch);
  if (!updated) throw new ApiError(404, "Post not found");
  return updated;
};

export const deletePostService = async (id: string) => {
  const ok = await repo.deletePostRepo(id);
  if (!ok) throw new ApiError(404, "Post not found");
  return;
};
