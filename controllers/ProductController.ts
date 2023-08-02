import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Add / Create Product
const CreateProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const product = await prisma.product.create({ data });
    if (product) {
      res.status(201).json(product);
    } else {
      res.status(400).send("Product not created!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access One Product
const GetProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send("No Product found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access All Products
const GetAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).send("No Products found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access All Products
const GetAllProductsOfBusiness = async (req: Request, res: Response) => {
  try {
    const bid = req.params.bid
    const products = await prisma.product.findMany({
        where: {
            sellerId : bid 
        }
    });
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).send("No Products found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit Product / Modify Product
const EditProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await prisma.product
      .update({
        where: {
          id,
        },
        data,
      })
      .then(() => res.status(201).json("Product Updated!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

// Remove Product / Delete Product
const RemoveProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.product
      .delete({
        where: {
          id,
        },
      })
      .then(() => res.status(201).json("Product Deleted!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

export {
  CreateProduct,
  GetProduct,
  GetAllProducts,
  GetAllProductsOfBusiness,
  EditProduct,
  RemoveProduct,
};
