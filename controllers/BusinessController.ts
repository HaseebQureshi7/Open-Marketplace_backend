import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Signup / Create Account
const BusinessSignup = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const business = await prisma.business.create({ data });
    if (business) {
      res.status(201).json(business);
    } else {
      res.status(400).send("Business not created!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Login / Access Account
const BusinessLogin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const business = await prisma.business.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });
    if (business) {
      res.status(200).json(business);
    } else {
      res.status(401).send("Invalid Email or password");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit Profile / Modify Account
const EditBusinessAccount = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await prisma.business
      .update({
        where: {
          id,
        },
        data,
      })
      .then(() => res.status(201).json("Profile Updated!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete Profile / Delete Account
const RemoveBusinessAccount = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.business
      .delete({
        where: {
          id,
        },
      })
      .then(() => res.status(201).json("Account Deleted!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

export {
  BusinessSignup,
  BusinessLogin,
  EditBusinessAccount,
  RemoveBusinessAccount,
};
