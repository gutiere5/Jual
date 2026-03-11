import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prismaClient } from "..";
import { logger } from "../middleware/logger";
import { Item } from "@repo/types/item.schema";

export const getItems = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Fetching all items");
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

  logger.info(`Successfully fetched ${items.length} items`);
  res.status(200).json({ items: items });
});

export const getItemsByID = asyncHandler(
  async (req: Request, res: Response) => {
    logger.info("Fetching item by ID");
    const { id } = req.params;
    const itemId = Number(id);

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
    logger.info(`Successfully fetched item data for ID: ${itemId}`);
    res.status(200).json({ item: requestedItem });
  },
);

export const createItem = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Creating new item");
  const { sku, name, category, uom, low_stock_threshold } = req.body as Item;

  const existingItem = await prismaClient.item.findUnique({ where: { sku } });
  if (existingItem) {
    logger.warn(`Attempt to create item with existing SKU: ${sku}`);
    throw new Error("Item with this SKU already exists");
  }

  const item = await prismaClient.item.create({
    data: { sku, name, uom, category, low_stock_threshold },
  });

  logger.info(`Successfully created Item ${item.name}`);
  res.status(201).json({ item });
});

export const updateItem = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Updating item");
  const { id } = req.params;
  const itemId = Number(id);

  if (isNaN(itemId)) {
    res.status(400);
    throw new Error("Invalid Item ID");
  }

  const { name, uom, low_stock_threshold, category } = req.body as Item;

  const item = await prismaClient.item.update({
    where: { id: itemId },
    data: { name, uom, low_stock_threshold, category },
  });

  logger.info(`Successfully updated Item ${item.name}`);
  res.status(201).json({ item });
});

export const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  logger.info("Deleting item");
  const { sku } = req.params as { sku: string };
  const item = await prismaClient.item.delete({ where: { sku } });

  logger.info(`Successfully deleted Item with SKU: ${sku}`);
  res.status(200).json({ item });
});
