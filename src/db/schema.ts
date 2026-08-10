import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  rank: text("rank").notNull(),
  skins: text("skins").notNull(),
  price: text("price").notNull(),
  imageUrl: text("image_url").notNull(),
  cloudinaryPublicId: text("cloudinary_public_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const profile = pgTable("profile", {
  id: text("id").primaryKey().default("main"),
  imageUrl: text("image_url"),
  cloudinaryPublicId: text("cloudinary_public_id"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
