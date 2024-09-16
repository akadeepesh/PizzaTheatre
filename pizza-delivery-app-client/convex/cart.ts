import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addToCart = mutation({
  args: {
    pizzaId: v.id("pizzas"),
    size: v.union(v.literal("small"), v.literal("medium")),
  },
  handler: async (ctx, args) => {
    const { pizzaId, size } = args;
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    const userId = identity.subject;
    await ctx.db.insert("cartItems", { userId, pizzaId, size, quantity: 1 });
  },
});

export const updateCartItemQuantity = mutation({
  args: {
    pizzaId: v.id("pizzas"),
    size: v.union(v.literal("small"), v.literal("medium")),
    quantityChange: v.number(),
  },
  handler: async (ctx, args) => {
    const { pizzaId, size, quantityChange } = args;
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    const userId = identity.subject;

    const existingItem = await ctx.db
      .query("cartItems")
      .filter((q) => q.eq(q.field("pizzaId"), pizzaId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("size"), size))
      .unique();

    if (existingItem) {
      await ctx.db.patch(existingItem._id, {
        quantity: existingItem.quantity + quantityChange,
      });
    }
  },
});

export const getUserCartItems = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User is not authenticated");
    }
    const userId = identity.subject;
    return await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const deleteCartItem = mutation({
  args: {
    pizzaId: v.id("pizzas"),
    size: v.union(v.literal("small"), v.literal("medium")),
  },
  handler: async (ctx, args) => {
    const { pizzaId, size } = args;
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    const userId = identity.subject;

    const existingItem = await ctx.db
      .query("cartItems")
      .filter((q) => q.eq(q.field("pizzaId"), pizzaId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("size"), size))
      .unique();

    if (existingItem) {
      await ctx.db.delete(existingItem._id);
    }
  },
});
