import { UserDataModel } from "../model";
import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../utils/interfaces/responses";
import {
  status200Ok,
  status201Created,
  status400BadRequest,
  status404NotFound,
  status500InternalServerError,
} from "../utils/methods/httpResponses";
import { requestGetParamsValidator } from "../utils/methods";
import { Request, Response } from "express";
import { getGenericResponseHelper } from "../utils/methods/responseHelpers";
import bcrypt from "bcrypt";

const model = UserDataModel;

export async function registerUser(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const {
    user_email,
    user_password,
  } = req.body;

  if(req.body.id_user_rol){
    res.status(400).json(status400BadRequest("INVALID REQUEST"))
  } 

  try {
    const user = await model.findOne({ where: { user_email: user_email } });
    if (user) {
      res
        .status(400)
        .json(status400BadRequest("User with given email already exists"));
    }

    const salt = await bcrypt.genSalt(7);
    const hashPassword = await bcrypt.hash(user_password, salt);
    console.log(user_password)
    console.log(hashPassword)

    const newUser = await model.create({
      ...req.body,
      id_user_rol: 3,
      user_password: hashPassword,
    });
    res
      .status(201)
      .json(
        status201Created(newUser, "user_data", "A new user has been created")
      );
  } catch (error) {
    res.status(500).json(status500InternalServerError(`${error}`));
  }
}
