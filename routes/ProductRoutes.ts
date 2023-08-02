import express from "express";
import {
  CreateProduct,
  EditProduct,
  GetAllProducts,
  GetAllProductsOfBusiness,
  GetProduct,
  RemoveProduct,
} from "../controllers/ProductController";

const ProductRouter = express.Router();

ProductRouter.get("/getProduct/:id", GetProduct);
ProductRouter.get("/getAllProducts", GetAllProducts);
ProductRouter.get("/getAllProductsOfBusiness/:bid", GetAllProductsOfBusiness);
ProductRouter.post("/createProduct", CreateProduct);
ProductRouter.put("/editProduct/:id", EditProduct);
ProductRouter.delete("/removeProduct/:id", RemoveProduct);

export default ProductRouter;
