import express from "express";
import routes from "./index";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/error.handler";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const MONGO_URI =
  process.env.MONGO_URI ?? "mongodb://localhost:27017/blogdb";

const app = express();
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => res.json({ status: "ok" }));

// error handler last
app.use(errorHandler);

async function start() {
  await connectDB(MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start", err);
  process.exit(1);
});
