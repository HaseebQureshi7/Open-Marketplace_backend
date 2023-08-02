import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Add / Create Business Review
const CreateBusinessReview = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const businessReview = await prisma.businessReview.create({ data });
    if (businessReview) {
      res.status(201).json(businessReview);
    } else {
      res.status(400).send("Business Review not created!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access All Business Reviews
const GetAllBusinessReviews = async (req: Request, res: Response) => {
  try {
    const bid = req.params.bid;
    const businessReview = await prisma.businessReview.findMany({
      where: {
        ofBusiness: bid
      },
    });
    if (businessReview) {
      res.status(200).json(businessReview);
    } else {
      res.status(404).send("No Business Review found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit Business Review / Modify Business Review
const EditBusinessReview = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await prisma.businessReview
      .update({
        where: {
          id,
        },
        data,
      })
      .then(() => res.status(201).json("Business Review Updated!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

// Remove Business Review / Delete Business Review
const RemoveBusinessReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.businessReview
      .delete({
        where: {
          id,
        },
      })
      .then(() => res.status(201).json("Business Review Deleted!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

export {
  CreateBusinessReview,
  GetAllBusinessReviews,
  EditBusinessReview,
  RemoveBusinessReview,
};
