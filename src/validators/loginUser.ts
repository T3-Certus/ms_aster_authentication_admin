import { check } from "express-validator";
import { validateCreateRequest } from "../utils/methods";

export const loginUserValidator = [
  check("user_email").exists().notEmpty().isEmail(),
  check("user_password").exists(). notEmpty().isString().isLength({min: 8}) ,

  (req: any, res: any, next: any) => {
    validateCreateRequest(req, res, next);
  },
]