import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Add / Create MonthSales
const CreateMonthSales = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const monthSales = await prisma.monthSales.create({ data });
    if (monthSales) {
      res.status(201).json(monthSales);
    } else {
      res.status(400).send("MonthSales not created!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access One MonthSales
const GetMonthSales = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const monthSales = await prisma.monthSales.findFirst({
      where: {
        id,
      },
    });
    if (monthSales) {
      res.status(200).json(monthSales);
    } else {
      res.status(404).send("No MonthSales found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access All MonthSales
const GetAllMonthSales = async (req: Request, res: Response) => {
  const bid = req.params.bid;
  try {
    const monthSales = await prisma.monthSales.findMany({
      where: {
        ofBusiness: bid,
      },
    });
    if (monthSales) {
      res.status(200).json(monthSales);
    } else {
      res.status(404).send("No MonthSales found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit MonthSales / Modify MonthSales
const EditMonthSales = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await prisma.monthSales
      .update({
        where: {
          id,
        },
        data,
      })
      .then(() => res.status(201).json("MonthSales Updated!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

// Remove MonthSales / Delete MonthSales
const RemoveMonthSales = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.monthSales
      .delete({
        where: {
          id,
        },
      })
      .then(() => res.status(201).json("MonthSales Deleted!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

export {
  CreateMonthSales,
  GetMonthSales,
  GetAllMonthSales,
  EditMonthSales,
  RemoveMonthSales,
};
