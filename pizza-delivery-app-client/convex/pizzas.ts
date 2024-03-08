import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const pizza = mutation({
  args: {
    name: v.string(),
    toppings: v.string(),
    price: v.object({
      small: v.number(),
      medium: v.number(),
    }),
    quantity: v.number(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("pizza", {
      name: args.name,
      toppings: args.toppings,
      price: args.price,
      quantity: args.quantity,
    });
  },
});
