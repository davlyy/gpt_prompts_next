import mongoose from "mongoose";
let isConnected = false; //track the connection

export const connectToDB = async () => {
  //set mongoose settings
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_promot",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("mongoDB is connect");
  } catch (error) {
    console.log(error);
  }
};
