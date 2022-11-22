import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../utils/interfaces/responses";
import {
  status200Ok,
  status201Created,
  status400BadRequest,
  status401Unauthorized,
  status404NotFound,
  status500InternalServerError,
} from "../utils/methods/httpResponses";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import verifyRefreshToken from "../services/verify_refresh_token.service";
import { config } from "../utils/config";
import { user_token } from "../model";

const userTokenModel = user_token;

export async function logoutUser(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { refreshToken } = req.body;

  try {
    const userRefreshToken = await userTokenModel.findOne({
      refreshToken: refreshToken,
    });
    if (!userRefreshToken) {
      res
        .status(200)
        .json(status200Ok({ error: false }, "", "Logged out succesfully"));
    }
    await userRefreshToken.remove();
    res
      .status(200)
      .json(status200Ok({ error: false }, "", "Logged out successfully"));
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}
