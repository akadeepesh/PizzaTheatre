import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  pizzas: defineTable({
    name: v.string(),
    toppings: v.array(v.string()),
    smallPrice: v.number(),
    mediumPrice: v.number(),
    imageUrl: v.optional(v.string()),
    isAvailable: v.boolean(),
  }),
  cartItems: defineTable({
    userId: v.string(),
    pizzaId: v.id("pizzas"),
    size: v.union(v.literal("small"), v.literal("medium")),
    quantity: v.number(),
  }).index("by_user", ["userId"]),
});
