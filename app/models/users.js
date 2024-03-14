import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  subject: String,
  message: String,
  date: String,
});

const userSchema = new mongoose.Schema({
  //   firstName: String,
  //   lastName: String,
  name: String,
  email: String,
  //   phoneNumber: String,
  message: [messageSchema],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
