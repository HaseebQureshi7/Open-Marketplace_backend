import express from "express";
import { CustomerLogin, CustomerSignup, EditCustomerAccount, RemoveCustomerAccount } from "../controllers/CustomerController";

const CustomerRouter = express.Router();

CustomerRouter.get("/login", CustomerLogin);
CustomerRouter.post("/signup", CustomerSignup);
CustomerRouter.put("/editProfile:/id", EditCustomerAccount);
CustomerRouter.delete("/removeAccount/:id", RemoveCustomerAccount);

export default CustomerRouter