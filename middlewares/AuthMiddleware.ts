import { NextFunction, Request, Response } from "express";
import GetUserFromToken, { TokenCleaner } from "../utils/GetUserFromToken";
import { jwtSecret } from "../utils/JWTSecretKey";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header: any = req.header("Authorization");
    const token: string = TokenCleaner(header);

    try {
      const decoded = GetUserFromToken(token, jwtSecret);
      if (decoded != null) {
        next();
      } else {
        res
          .status(401)
          .send(
            "Authorization Failed! Invalid or Expired Token (Auth L1 Error)"
          );
      }
    } catch (ex) {
      res.status(400).send("Invalid or Expired Token. Auth L1 Error!");
    }
  } catch (err) {
    res.status(401).send("Authorization Token Not Provided!");
  }
};

export default AuthMiddleware;
