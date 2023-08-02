import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Add / Create Product Review
const CreateProductReview = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const productReview = await prisma.productReview.create({ data });
    if (productReview) {
      res.status(201).json(productReview);
    } else {
      res.status(400).send("Product Review not created!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access All Product Reviews
const GetAllProductReviews = async (req: Request, res: Response) => {
  try {
    const pid = req.params.pid;
    const productReview = await prisma.productReview.findMany({
      where: {
        ofProduct: pid
      },
    });
    if (productReview) {
      res.status(200).json(productReview);
    } else {
      res.status(404).send("No Product Review found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit Product Review / Modify Product Review
const EditProductReview = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await prisma.productReview
      .update({
        where: {
          id,
        },
        data,
      })
      .then(() => res.status(201).json("Product Review Updated!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

// Remove Product Review / Delete Product Review
const RemoveProductReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.productReview
      .delete({
        where: {
          id,
        },
      })
      .then(() => res.status(201).json("Product Review Deleted!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

export {
  CreateProductReview,
  GetAllProductReviews,
  EditProductReview,
  RemoveProductReview,
};
