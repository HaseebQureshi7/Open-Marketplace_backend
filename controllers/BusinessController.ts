import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import GetUserFromToken from "../utils/GetUserFromToken";
import { jwtSecret } from "../utils/JWTSecretKey";
import { SaveProfilePicture } from "../utils/SaveImageLocally";

const prisma = new PrismaClient();

// Signup / Create Account
const BusinessSignup = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const profilePictureBase64 = data.profilePicture; // Extract Base64 data from req.body
    delete data.profilePicture; // Remove Base64 data from the 'data' object

    const imageUrl = SaveProfilePicture(profilePictureBase64, "business"); // Save picture to ./static/business and get the image URL
    if (imageUrl) {
      data.profilePicture = imageUrl;
    }
    const business = await prisma.business.create({ data });
    if (business) {
      const token = jwt.sign(business, jwtSecret);

      res.status(201).json({
        token,
        business,
      });
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
      const token = jwt.sign(business, jwtSecret);
      // console.log(jwt.verify(token, jwtSecret))
      res.status(200).json({
        token,
        business,
      });
    } else {
      res.status(401).send("Invalid Email or Password!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit Profile / Modify Account
const EditBusinessAccount = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const token: any = req.header("Authorization");
    const user: any = GetUserFromToken(token, jwtSecret);

    if (data.profilePicture) {
      const imageUrl = SaveProfilePicture(data.profilePicture, "business");
      if (imageUrl) {
        // fs.unlink(`../static/business/${data.profilePicture}`, () => {
        //   console.log('prev image deleted!')
        // });
        data.profilePicture = imageUrl;
      }
    }

    await prisma.business
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
const RemoveBusinessAccount = async (req: Request, res: Response) => {
  try {
    const token: any = req.header("Authorization");
    const user: any = GetUserFromToken(token, jwtSecret);

    await prisma.business
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
  BusinessSignup,
  BusinessLogin,
  EditBusinessAccount,
  RemoveBusinessAccount,
};
