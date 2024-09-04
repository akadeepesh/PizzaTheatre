import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const cartItem = mutation({
  args: {
    userId: v.string(),
    pizzaId: v.id("pizza"),
    size: v.string(),
    quantity: v.number(),
  },
  async handler(ctx, args) {
    const existingItem = await ctx.db
      .query("cart")
      .filter(
        (q) =>
          q.eq(q.field("userId"), args.userId) &&
          q.eq(q.field("pizzaId"), args.pizzaId) &&
          q.eq(q.field("size"), args.size),
      )
      .first();

    if (existingItem) {
      await ctx.db.patch(existingItem._id, { quantity: args.quantity });
    } else {
      await ctx.db.insert("cart", args);
    }
  },
});

export const getUserCartItems = query({
  args: {
    userId: v.string(),
  },
  async handler(ctx, args) {
    return ctx.db
      .query("cart")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});

export const updateCartItem = mutation({
  args: {
    userId: v.string(),
    pizzaId: v.id("pizza"),
    size: v.string(),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const existingItem = await ctx.db
      .query("cart")
      .filter(
        (q) =>
          q.eq(q.field("userId"), args.userId) &&
          q.eq(q.field("pizzaId"), args.pizzaId) &&
          q.eq(q.field("size"), args.size),
      )
      .first();

    if (existingItem) {
      if (args.quantity > 0) {
        await ctx.db.patch(existingItem._id, { quantity: args.quantity });
      } else {
        await ctx.db.delete(existingItem._id);
      }
    } else if (args.quantity > 0) {
      await ctx.db.insert("cart", args);
    }
  },
});

export const deleteCartItem = mutation({
  args: {
    userId: v.string(),
    pizzaId: v.id("pizza"),
    size: v.string(),
  },
  handler: async (ctx, args) => {
    const itemToDelete = await ctx.db
      .query("cart")
      .filter(
        (q) =>
          q.eq(q.field("userId"), args.userId) &&
          q.eq(q.field("pizzaId"), args.pizzaId) &&
          q.eq(q.field("size"), args.size),
      )
      .first();

    if (itemToDelete) {
      await ctx.db.delete(itemToDelete._id);
    }
  },
});
