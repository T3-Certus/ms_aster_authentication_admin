import mongoose, { Schema } from "mongoose";

const UserTokenSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  refreshToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 10 * 86400 }, //10 dias
});

// const UserToken = mongoose.model("UserToken", UserTokenSchema);

export default mongoose.models.UserRefreshToken || mongoose.model("UserRefreshToken", UserTokenSchema)
