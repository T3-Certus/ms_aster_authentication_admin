import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../utils/interfaces/responses";
import {
  status200Ok,
  status400BadRequest,
  status500InternalServerError,
} from "../utils/methods/httpResponses";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import verifyRefreshToken from "../services/verify_refresh_token.service";
import { config } from "../utils/config";

export async function generateAccessToken(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { refreshToken } = req.body;
  try {
    const tokenExists = await verifyRefreshToken(refreshToken);
    if (!tokenExists.success) {
      return res.status(400).json(status400BadRequest("Invalid refreshToken"));
    }

    const payload = {
      _id: tokenExists.tokenDetails?._id,
      rol: tokenExists.tokenDetails?.rol,
      email: tokenExists.tokenDetails?.email,
    };
    const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_KEY, {
      expiresIn: "15m",
    });

    return res
      .status(200)
      .json(
        status200Ok(
          { accessToken: accessToken },
          "",
          "Access token created succesfully"
        )
      );
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`));
  }
}
