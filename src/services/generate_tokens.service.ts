import jwt from "jsonwebtoken";
import { user_token } from "../model";
import { config } from "../utils/config";

const UserToken = user_token

export default async function generateTokens(user: any) {
  try {
    const payload = { _id: user._id, rol: user.rol };
    const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_KEY, {
      expiresIn: "14m",
    });
    const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_KEY, {
      expiresIn: "10d",
    });
    console.log(accessToken)
    console.log(refreshToken)

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) {
      await userToken.remove();
    }
    await new UserToken({ userId: user._id, refreshToken: refreshToken }).save();

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
}
