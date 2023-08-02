import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Signup / Create Account
const CustomerSignup = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const customer = await prisma.customer.create({ data });
    if (customer) {
      res.status(201).json(customer);
    } else {
      res.status(400).send("Customer not created!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Login / Access Account
const CustomerLogin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const customer = await prisma.customer.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(401).send("Invalid Email or password");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit Profile / Modify Account
const EditCustomerAccount = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await prisma.customer
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
const RemoveCustomerAccount = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.customer
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
  CustomerSignup,
  CustomerLogin,
  EditCustomerAccount,
  RemoveCustomerAccount,
};
