import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import GetUserFromToken from "../utils/GetUserFromToken";
import { jwtSecret } from "../utils/JWTSecretKey";

const prisma = new PrismaClient();

// Signup / Create Account
const CustomerSignup = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const customer = await prisma.customer.create({ data });
    if (customer) {
      const token = jwt.sign(customer, jwtSecret);
      res.status(201).json({
        token,
        customer,
      });
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
      const token = jwt.sign(customer, jwtSecret);

      res.status(200).json({
        token,
        customer,
      });
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

    const token: any = req.header("Authorization");
    const user: any = GetUserFromToken(token, jwtSecret);

    await prisma.customer
      .update({
        where: {
          id: user.id,
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
    const token: any = req.header("Authorization");
    const user: any = GetUserFromToken(token, jwtSecret);

    await prisma.customer
      .delete({
        where: {
          id: user.id,
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
