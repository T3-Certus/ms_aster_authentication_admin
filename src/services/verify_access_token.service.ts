// import jwt from "jsonwebtoken";
// import { config } from "../utils/config";

// export default function verifyAccessToken(accessToken: any) {
//   const privateKey = config.ACCESS_TOKEN_KEY;

//   try {
//     const tokenDetails = jwt.verify(accessToken, privateKey);
    
//     console.log(tokenDetails);
//     return {
//       success: true,
//       message: "Valid access token",
//       tokenDetails: {
//         _id: <number>(<any>tokenDetails)._id,
//         rol: <string>(<any>tokenDetails).rol,
//         email: <string>(<any>tokenDetails).email
//       },
//     };
//   } catch (error) {
//     throw new Error(`${error}`);
//   }
// }
