import express from "express";
import {
  CustomerLogin,
  CustomerSignup,
  EditCustomerAccount,
  GetCustomer,
  RemoveCustomerAccount,
} from "../controllers/CustomerController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const CustomerRouter = express.Router();

CustomerRouter.post("/login", CustomerLogin);
CustomerRouter.post("/signup", CustomerSignup);
CustomerRouter.get("/getCustomer/:cid", GetCustomer);
CustomerRouter.put("/editProfile", AuthMiddleware, EditCustomerAccount);   // Extracts ID from JWT to modify profile
CustomerRouter.delete(
  "/removeAccount",
  AuthMiddleware,
  RemoveCustomerAccount
);   // Extracts ID from JWT to Remove profile

export default CustomerRouter;
