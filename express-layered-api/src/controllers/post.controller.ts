import { Request, Response } from "express";
import * as service from "../services/post.service";
import { successResponse, errorResponse } from "../utils/response";

/**
 * Controllers handle req/res only and delegate to service.
 */

export const createPost = async (req: Request, res: Response) => {
  const payload = req.body;
  const post = await service.createPostService(payload);
  res.status(201).json(successResponse("Post created", post));
};

export const listPosts = async (req: Request, res: Response) => {
  const posts = await service.listPostsService();
  res.json(successResponse("Posts fetched", posts));
};

export const getPostById = async (req: Request, res: Response) => {
  const post = await service.getPostByIdService(req.params.id);
  res.json(successResponse("Post fetched", post));
};

export const updatePost = async (req: Request, res: Response) => {
  const updated = await service.updatePostService(
    req.params.id,
    req.body
  );
  res.json(successResponse("Post updated", updated));
};

export const deletePost = async (req: Request, res: Response) => {
  await service.deletePostService(req.params.id);
  res.json(successResponse("Post deleted", null));
};
