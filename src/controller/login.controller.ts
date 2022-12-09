import { UserDataModel, UserRoleModel } from "../model";
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
import bcrypt from "bcrypt";
import generateTokens from "../services/generate_tokens.service";

const userModel = UserDataModel

export async function loginUser(req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse>){
  const {user_email, user_password} = req.body

  try {
    const user = await userModel.findOne({where: {user_email: user_email}, include: {model: UserRoleModel, attributes: ["user_rol_name"]}})

    if(!user){
      return res.status(401).json(status401Unauthorized("Invalid email"))  
    }
    const data = user?.dataValues

    const userData = {
      _id: data.id_user,
      rol: data.user_role.dataValues.user_rol_name,
      email: data.user_email,
      
    }
    console.log(data)
    console.log(userData)

    const verifiedPassword = await bcrypt.compare(user_password, data.user_password)
    if(!verifiedPassword){
      return res.status(401).json(status401Unauthorized("Invalid password"))
    }

    const {accessToken, refreshToken} = await generateTokens(userData)
    
    return res.status(200).json(status200Ok({accessToken: accessToken, refreshToken: refreshToken}, "", "User successfully logged"))

  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`))
  }
}