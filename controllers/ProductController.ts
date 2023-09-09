import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { SaveProfilePicture } from "../utils/SaveImageLocally";

const prisma = new PrismaClient();

// Add / Create Product
const CreateProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const productImageBase64 = data.productImage; // Extract Base64 data from req.body
    delete data.productImage; // Remove Base64 data from the 'data' object

    const imageUrl = SaveProfilePicture(productImageBase64, "product"); // Save picture to ./static/business and get the image URL
    if (imageUrl) {
      data.productImage = imageUrl;
    }

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
    // console.log(id)
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
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
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

// Get / Access All Products
const GetAllProductsOfBusiness = async (req: Request, res: Response) => {
  try {
    const bid = req.params.bid;
    const products = await prisma.product.findMany({
      where: {
        sellerId: bid,
      },
      orderBy: {
        id: "desc",
      },
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

// Get / Access All Products
const GetAllProductsInCategory = async (req: Request, res: Response) => {
  const catId = req.params.cid;
  try {
    const products = await prisma.product.findMany({
      where: {
        category: catId,
      },
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

    if (data.productImage.includes("static")) {
    } else {
      const imageUrl = SaveProfilePicture(data.productImage, "product");
      if (imageUrl) {
        // fs.unlink(`../static/business/${data.profilePicture}`, () => {
        //   console.log('prev image deleted!')
        // });
        data.productImage = imageUrl;
      }
    }

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
      .deleteMany({
        where: {
          id,
        },
      })
      .then(() => res.status(201).json("Product Deleted!"))
      .catch((e) => res.status(403).send(e));
  } catch (err) {
    res.status(400).send(err);
  }
};

export {
  CreateProduct,
  GetProduct,
  GetAllProducts,
  GetAllProductsInCategory,
  GetAllProductsOfBusiness,
  EditProduct,
  RemoveProduct,
};
