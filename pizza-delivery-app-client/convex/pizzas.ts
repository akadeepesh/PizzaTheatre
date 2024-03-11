import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
    function validatePrice(price: { small?: number; medium?: number }) {
      if (!price.small && !price.medium) {
        throw new Error(
          "At least one of small or medium price must be provided."
        );
      }
      if (
        (price.small && price.small < 0) ||
        (price.medium && price.medium < 0)
      ) {
        throw new Error("Pizza price cannot be negative.");
      }
    }

    validatePrice(args.price);

    await ctx.db.insert("pizza", {
      name: args.name,
      toppings: args.toppings,
      price: args.price,
      quantity: args.quantity,
    });
  },
});

export const getPizzas = query({
  args: {},
  async handler(ctx, args) {
    return ctx.db.query("pizza").collect();
  },
});
