import { z } from "zod";

const TextStyleSchema = z.object({
  fontSize: z.number(),
  fill: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  fontFamily: z.string(),
  fontStyle: z.enum(["normal", "bold", "italic"]),
});

const BaseItemSchema = z.object({
  instanceId: z.string(),
  x: z.number(),
  y: z.number(),
  scaleX: z.number(),
  scaleY: z.number(),
});

const TextItemSchema = BaseItemSchema.extend({
  type: z.literal("text"),
  opacity: z.number().min(0).max(1),
  fillAfterStrokeEnabled: z.boolean(),
  fill: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  text: z.string(),
  fontFamily: z.string(),
  fontSize: z.number(),
  fontStyle: z.enum(["normal", "bold", "italic"]),
});

const RectItemSchema = BaseItemSchema.extend({
  type: z.literal("rect"),
  width: z.number(),
  height: z.number(),
  fill: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  stroke: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  strokeWidth: z.number(),
  cornerRadius: z.number(),
  dash: z.array(z.number()),
  dashEnabled: z.boolean(),
  label: z.string(),
});

const LineItemSchema = BaseItemSchema.extend({
  type: z.literal("line"),
  points: z.array(z.number()),
  stroke: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  strokeWidth: z.number(),
  label: z.string(),
});

const MenuItemSchema = BaseItemSchema.extend({
  type: z.literal("menu"),
  width: z.number(),
  height: z.number(),
  fill: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  stroke: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  strokeWidth: z.number(),
  opacity: z.number().min(0).max(1),
  shadowBlur: z.number(),
  showTitle: z.boolean(),
  showImage: z.boolean(),
  showDescription: z.boolean(),
  showPrice: z.boolean(),
  titleStyle: TextStyleSchema,
  descriptionStyle: TextStyleSchema,
  priceStyle: TextStyleSchema,
  name: z.string(),
  price: z.string(),
  image_src: z.string(),
  description: z.string().optional(),
});

const CircleItemSchema = BaseItemSchema.extend({
  type: z.literal("circle"),
  radius: z.number(),
  fill: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  stroke: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  strokeWidth: z.number(),
  label: z.string(),
});

export const CanvasItemSchema = z.discriminatedUnion("type", [
  MenuItemSchema,
  TextItemSchema,
  RectItemSchema,
  LineItemSchema,
  CircleItemSchema,
]);

const canvasSettings = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  backgroundColor: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  showGrid: z.boolean(),
  gridSize: z.number().positive(),
});

export const CanvasData = z.object({
  items: z.array(CanvasItemSchema),
  canvasSettings: canvasSettings,
});

export const CanvasFileData = z.object({
  id: z.number(),
  name: z.string(),
  content: CanvasData,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CanvasData = z.infer<typeof CanvasData>;
export type CanvasItemSchema = z.infer<typeof CanvasItemSchema>;
export type CanvasFileData = z.infer<typeof CanvasFileData>;
