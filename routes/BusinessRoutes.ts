import express from "express";
import {
  BusinessLogin,
  BusinessSignup,
  EditBusinessAccount,
  RemoveBusinessAccount,
} from "../controllers/BusinessController";

const BusinessRouter = express.Router();

BusinessRouter.get("/login", BusinessLogin);
BusinessRouter.post("/signup", BusinessSignup);
BusinessRouter.put("/editProfile/:id", EditBusinessAccount);
BusinessRouter.delete("/removeAccount/:id", RemoveBusinessAccount);

export default BusinessRouter;
