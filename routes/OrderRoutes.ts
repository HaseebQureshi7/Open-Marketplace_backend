import express from "express";
import {
  CreateOrder,
  EditOrder,
  GetAllOrdersForBusiness,
  GetAllOrdersForCustomer,
  GetOrder,
  RemoveOrder,
} from "../controllers/OrderController";

const OrderRouter = express.Router();

OrderRouter.get("/getOrder/:id", GetOrder);
OrderRouter.get("/getAllOrdersForCustomer/:cid", GetAllOrdersForCustomer);
OrderRouter.get("/getAllOrdersForBusiness/:bid", GetAllOrdersForBusiness);
OrderRouter.post("/createOrder", CreateOrder);
OrderRouter.put("/editOrder/:id", EditOrder);
OrderRouter.delete("/removeOrder/:id", RemoveOrder);

export default OrderRouter;
