import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserCartItems = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const { userId } = args;
    return await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const updateCartItem = mutation({
  args: {
    userId: v.string(),
    pizzaId: v.id("pizzas"),
    size: v.union(v.literal("small"), v.literal("medium")),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const { userId, pizzaId, size, quantity } = args;

    const existingItem = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter(
        (q) => q.eq(q.field("pizzaId"), pizzaId) && q.eq(q.field("size"), size),
      )
      .first();

    if (existingItem) {
      await ctx.db.patch(existingItem._id, { quantity });
    } else {
      await ctx.db.insert("cartItems", {
        userId,
        pizzaId,
        size,
        quantity,
      });
    }
  },
});

export const deleteCartItem = mutation({
  args: {
    userId: v.string(),
    pizzaId: v.id("pizzas"),
    size: v.union(v.literal("small"), v.literal("medium")),
  },
  handler: async (ctx, args) => {
    const { userId, pizzaId, size } = args;

    const existingItem = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter(
        (q) => q.eq(q.field("pizzaId"), pizzaId) && q.eq(q.field("size"), size),
      )
      .first();

    if (existingItem) {
      await ctx.db.delete(existingItem._id);
    }
  },
});
