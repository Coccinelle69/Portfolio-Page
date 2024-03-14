import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  subject: String,
  message: String,
  date: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  phone: String,
  message: [messageSchema],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
