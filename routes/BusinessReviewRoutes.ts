import express from "express";
import {
  CreateBusinessReview,
  EditBusinessReview,
  GetAllBusinessReviews,
  RemoveBusinessReview,
} from "../controllers/BusinessReviewController";

const BusinessReviewRouter = express.Router();

BusinessReviewRouter.get("/getAllBusinessReviewsForBusiness/:bid", GetAllBusinessReviews);
BusinessReviewRouter.post("/createBusinessReview", CreateBusinessReview);
BusinessReviewRouter.put("/editBusinessReview/:id", EditBusinessReview);
BusinessReviewRouter.delete("/removeBusinessReview/:id", RemoveBusinessReview);

export default BusinessReviewRouter;
