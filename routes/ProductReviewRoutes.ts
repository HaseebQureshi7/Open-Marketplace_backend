import express from "express";
import {
  CreateProductReview,
  EditProductReview,
  GetAllProductReviews,
  RemoveProductReview,
} from "../controllers/ProductReviewController";

const ProductReviewRouter = express.Router();

ProductReviewRouter.get("/getAllProductReviewsForBusiness/:pid", GetAllProductReviews);
ProductReviewRouter.post("/createProductReview", CreateProductReview);
ProductReviewRouter.put("/editProductReview/:id", EditProductReview);
ProductReviewRouter.delete("/removeProductReview/:id", RemoveProductReview);

export default ProductReviewRouter;
