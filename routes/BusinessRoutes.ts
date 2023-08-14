import express from "express";
import {
  BusinessLogin,
  BusinessSignup,
  EditBusinessAccount,
  RemoveBusinessAccount,
} from "../controllers/BusinessController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const BusinessRouter = express.Router();

BusinessRouter.post("/login", BusinessLogin);
BusinessRouter.post("/signup", BusinessSignup);
BusinessRouter.put("/editProfile", AuthMiddleware, EditBusinessAccount);
BusinessRouter.delete("/removeAccount", AuthMiddleware, RemoveBusinessAccount);

export default BusinessRouter;
