import { Router } from "express";
import * as controller from "../controllers/post.controller";
import { asyncHandler } from "../middlewares/async.handler";
import { validateRequest } from "../middlewares/validate.request";
import {
  createPostSchema,
  updatePostSchema,
} from "../validators/post.validator";

const router = Router();

/**
 * RESTful routes
 * POST   /api/posts      -> create
 * GET    /api/posts      -> list
 * GET    /api/posts/:id  -> get
 * PUT    /api/posts/:id  -> update (replace-ish)
 * DELETE /api/posts/:id  -> delete
 */

// create
router.post(
  "/",
  validateRequest(createPostSchema),
  asyncHandler(controller.createPost)
);

// list
router.get("/", asyncHandler(controller.listPosts));

// get
router.get("/:id", asyncHandler(controller.getPostById));

// update
router.put(
  "/:id",
  validateRequest(updatePostSchema),
  asyncHandler(controller.updatePost)
);

// delete
router.delete("/:id", asyncHandler(controller.deletePost));

export default router;
