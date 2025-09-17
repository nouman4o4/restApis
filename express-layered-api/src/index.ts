import { Router } from "express";
import postRoutes from "./routes/post.routes";

const router = Router();

router.use("/posts", postRoutes);

export default router;
