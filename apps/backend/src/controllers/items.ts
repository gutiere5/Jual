import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prismaClient } from "..";

export const getItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await prismaClient.item.findMany({
    include: {
      stock_batch: {
        select: {
          quantity_received: true,
          quantity_remaining: true,
          expiration_date: true,
          received_at: true,
          cost_at_purchase: true,
        },
      },
      transaction: {
        select: { type: true, quantity: true, transaction_date: true },
      },
      waste: {
        select: { quantity: true, reason: true, created_at: true },
      },
    },
  });

  res.status(200).json({ items: items });
});

export const getItemsByID = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    let itemId = Number(id);

    const requestedItem = await prismaClient.item.findUnique({
      where: {
        id: itemId,
      },
      include: {
        stock_batch: {
          select: {
            quantity_received: true,
            quantity_remaining: true,
            expiration_date: true,
            received_at: true,
            cost_at_purchase: true,
          },
        },
        transaction: {
          select: { type: true, quantity: true, transaction_date: true },
        },
        waste: {
          select: { quantity: true, reason: true, created_at: true },
        },
      },
    });
    res.status(200).json({ item: requestedItem });
  },
);

export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const { sku, name, category, uom, low_stock_threshold } = req.body;

  const existingItem = await prismaClient.item.findUnique({ where: { sku } });
  if (existingItem) {
    throw new Error("Item with this SKU already exists");
  }

  const item = await prismaClient.item.create({
    data: { sku, name, uom, category, low_stock_threshold },
  });

  res.status(201).json({ item });
});

export const updateItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const itemId = Number(id);

  if (isNaN(itemId)) {
    res.status(400);
    throw new Error("Invalid Item ID");
  }

  const { name, uom, low_stock_threshold, category } = req.body;

  const item = await prismaClient.item.update({
    where: { id: itemId },
    data: { name, uom, low_stock_threshold, category },
  });

  res.status(201).json({ item });
});

export const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  const { sku } = req.params;
  const item = await prismaClient.item.delete({ where: { sku } });

  res.status(200).json({ item });
});
