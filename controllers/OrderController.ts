import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Add / Create Order
const CreateOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // console.log(data)
    const order = await prisma.order.create({ data });
    if (order) {
      res.status(201).json(order);
    } else {
      res.status(400).send("Order not created!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access One Order
const GetOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).send("No Order found!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access All Orders for a Customer
const GetAllOrdersForCustomer = async (req: Request, res: Response) => {
  const customerId = req.params.cid;
  try {
    const orders = await prisma.order.findMany({
      where: {
        customerId,
      },
      orderBy: {
        addedAt : "desc"
      }
    });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).send("No Orders found for the customer!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get / Access All Orders for a Business
const GetAllOrdersForBusiness = async (req: Request, res: Response) => {
  const businessId = req.params.bid;
  try {
    const orders = await prisma.order.findMany({
      where: {
        businessId,
        orderStatus : "Incomplete"
      },
      orderBy: {
        addedAt : "desc"
      }
    });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).send("No Orders found for the business!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Edit Order / Modify Order
const EditOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await prisma.order
      .update({
        where: {
          id,
        },
        data,
      })
      .then(() => res.status(201).json("Order Updated!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

// Remove Order / Delete Order
const RemoveOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await prisma.order
      .delete({
        where: {
          id,
        },
      })
      .then(() => res.status(201).json("Order Deleted!"))
      .catch(() => res.status(403).send("Something went wrong!"));
  } catch (err) {
    res.status(400).send(err);
  }
};

export {
  CreateOrder,
  GetOrder,
  GetAllOrdersForCustomer,
  GetAllOrdersForBusiness,
  EditOrder,
  RemoveOrder,
};
