// import {
//   GenericServiceErrorResponse,
//   GenericServiceResponse,
// } from "../utils/interfaces/responses";
// import {
//   status200Ok,
//   status400BadRequest,
//   status500InternalServerError,
// } from "../utils/methods/httpResponses";
// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import verifyAccessToken from "../services/verify_access_token.service";
// import { config } from "../utils/config";

// export async function verifyAToken(
//   req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse>
// ){
//   const {accessToken} = req.body
//   try{
//     const tokenIsValid = verifyAccessToken(accessToken)
//     if(!tokenIsValid.success){
//       return res.status(400).json(status400BadRequest("Invalid access token"))
//     }

//     return res
//   }
// }