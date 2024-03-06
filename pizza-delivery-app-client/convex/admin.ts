import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createAdmin = mutation({
  args: {
    isAdmin: v.boolean(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("admin", { isAdmin: args.isAdmin });
  },
});
