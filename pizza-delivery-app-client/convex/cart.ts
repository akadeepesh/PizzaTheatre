import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const cartItem = mutation({
  args: {
    userId: v.string(),
    pizzaId: v.string(),
    quantity: v.number(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("cart", {
      userId: args.userId,
      pizzaId: args.pizzaId,
      quantity: args.quantity,
    });
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

export const deleteTask = mutation({
  args: { id: v.id("cart") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
