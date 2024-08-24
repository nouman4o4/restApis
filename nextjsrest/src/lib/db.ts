import mongoose from "mongoose";

const connectDb = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("MongoDB is already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("connecting");
    return;
  }
  try {
    mongoose
      .connect(process.env.MONGODB_URI!)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });
  } catch (error) {
    console.log("db connection failed!! error: ", error);
  }
};

export default connectDb;
