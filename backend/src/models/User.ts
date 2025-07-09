import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Not required for OAuth
  provider: { type: String, enum: ["google", "github", "manual"], required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
