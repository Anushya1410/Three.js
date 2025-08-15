import { sql } from "drizzle-orm";
import { pgTable, text, varchar, numeric, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  modelPath: text("model_path").notNull(),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  colors: jsonb("colors").$type<{name: string, value: string}[]>().notNull().default([]),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  specifications: jsonb("specifications").$type<Record<string, string>>().notNull().default({}),
  rating: numeric("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: numeric("review_count").default("0"),
  inStock: boolean("in_stock").notNull().default(true),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
