import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addPizza = mutation({
  args: {
    name: v.string(),
    toppings: v.array(v.string()),
    smallPrice: v.number(),
    mediumPrice: v.number(),
    imageUrl: v.optional(v.string()),
    isAvailable: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { name, toppings, smallPrice, mediumPrice, imageUrl, isAvailable } =
      args;
    return await ctx.db.insert("pizzas", {
      name,
      toppings,
      smallPrice,
      mediumPrice,
      imageUrl,
      isAvailable,
    });
  },
});

export const getPizzas = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("pizzas")
      .filter((q) => q.eq(q.field("isAvailable"), true))
      .collect();
  },
});

export const updatePizza = mutation({
  args: {
    id: v.id("pizzas"),
    name: v.optional(v.string()),
    toppings: v.optional(v.array(v.string())),
    smallPrice: v.optional(v.number()),
    mediumPrice: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    isAvailable: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    await ctx.db.patch(id, updateFields);
  },
});

export const deletePizza = mutation({
  args: { id: v.id("pizzas") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
