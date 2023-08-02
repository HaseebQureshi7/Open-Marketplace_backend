import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import BusinessRouter from "./routes/BusinessRoutes";
import CustomerRouter from "./routes/CustomerRoutes";
import CategoryRouter from "./routes/CategoryRoutes";
import OrderRouter from "./routes/OrderRoutes";
import ProductRouter from "./routes/ProductRoutes";
import BusinessReviewRouter from "./routes/BusinessReviewRoutes";
import ProductReviewRouter from "./routes/ProductReviewRoutes";
import MonthSalesRouter from "./routes/MonthSalesRoutes";

dotenv.config();
const App = express();
const port = process.env.PORT || 4000;

App.use(urlencoded({ extended: false, limit: "2mb" }));
App.use(json({ limit: "2mb" }));
App.use(cors());

// ROUTES
App.use("/business", BusinessRouter);
App.use("/customer", CustomerRouter);
App.use("/category", CategoryRouter);
App.use("/order", OrderRouter);
App.use("/product", ProductRouter);
App.use("/businessReview", BusinessReviewRouter);
App.use("/productReview", ProductReviewRouter);
App.use("/monthSales", MonthSalesRouter);

App.listen(port, () => {
  console.log(`Server Running on Port http://192.168.29.117:${port}`);
});
