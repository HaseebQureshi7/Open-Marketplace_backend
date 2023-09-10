import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { SaveProfilePicture } from "../utils/SaveImageLocally";

const prisma = new PrismaClient();

// Add / Create Category
const CreateCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const categoryImageBase64 = data.categoryImage; // Extract Base64 data from req.body
    delete data.categoryImage; // Remove Base64 data from the 'data' object

    const imageUrl = SaveProfilePicture(categoryImageBase64, "category"); // Save picture to ./static/business and get the image URL
    if (imageUrl) {
      data.categoryImage = imageUrl;
    }

    const category = await prisma.category.create({ data });
    if (category) {
      res.status(201).json(category);
    } else {
      res.status(400).send("Category not created!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access One Categories
const GetCategory = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(401).send("No categories found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access One Categories
const GetCategoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(401).send("No categories found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access All Categories
const GetAllCategories = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(401).send("No categories found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access All Prods By Categories
const GetProductsByCategories = async (req: Request, res: Response) => {
  try {
    const cid = req.params.id;

    const category = await prisma.product.findMany({
      where: {
        category: cid,
      },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(401).send("No categories found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit Category / Modify Category
const EditCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;

    if (data.categoryImage) {
      const imageUrl = SaveProfilePicture(data.categoryImage, "category");
      if (imageUrl) {
        // fs.unlink(`../static/business/${data.profilePicture}`, () => {
        //   console.log('prev image deleted!')
        // });
        data.categoryImage = imageUrl;
      }
    }

    await prisma.category
      .update({
        where: {
          id,
        },
        data,
      })
      .then(() => res.status(201).json("Category Updated!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

// Remove Category / Delete Category
const RemoveCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.category
      .delete({
        where: {
          id,
        },
      })
      .then(() => res.status(201).json("Category Deleted!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

export {
  CreateCategory,
  GetCategory,
  GetCategoryById,
  GetProductsByCategories,
  GetAllCategories,
  EditCategory,
  RemoveCategory,
};
