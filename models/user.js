import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
});

//if a model with the name of "User" already exists, use it, otherweise create a new model
const User = models.User || model("User", UserSchema);

export default User;
