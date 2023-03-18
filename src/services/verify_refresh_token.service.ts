import jwt from "jsonwebtoken";
import { user_token } from "../model";
import { config } from "../utils/config";

const UserToken = user_token;

export default async function verifyRefreshToken(refreshToken: any) {
  const privateKey = config.REFRESH_TOKEN_KEY;

  try {
    const userRefreshToken = await UserToken.findOne({
      refreshToken: refreshToken,
    });
    if (!userRefreshToken) {
      return { success: false, message: "Invalid refresh token" };
    }
    const tokenDetails = jwt.verify(refreshToken, privateKey);

    // console.log(tokenDetails);
    return {
      success: true,
      message: "Valid refresh token",
      tokenDetails: {
        _id: <number>(<any>tokenDetails)._id,
        rol: <string>(<any>tokenDetails).rol,
        email: <string>(<any>tokenDetails).email
      },
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
}
