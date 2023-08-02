import express from "express";
import {
  CreateCategory,
  EditCategory,
  GetAllCategories,
  GetCategory,
  RemoveCategory,
} from "../controllers/CategoryController";

const CategoryRouter = express.Router();

CategoryRouter.get("/getCategory", GetCategory);
CategoryRouter.get("/getAllCategories", GetAllCategories);
CategoryRouter.post("/createCategory", CreateCategory);
CategoryRouter.put("/editCategory/:id", EditCategory);
CategoryRouter.delete("/removeCategory/:id", RemoveCategory);

export default CategoryRouter;
