import express from "express";
import {
  CreateMonthSales,
  EditMonthSales,
  GetAllMonthSales,
  GetMonthSales,
  RemoveMonthSales,
} from "../controllers/MonthSalesController";

const MonthSalesRouter = express.Router();

MonthSalesRouter.get("/getMonthSales/:id", GetMonthSales);
MonthSalesRouter.get("/getAllMonthSales/:bid", GetAllMonthSales);
MonthSalesRouter.post("/createMonthSales", CreateMonthSales);
MonthSalesRouter.put("/editMonthSales/:id", EditMonthSales);
MonthSalesRouter.delete("/removeMonthSales/:id", RemoveMonthSales);

export default MonthSalesRouter;
