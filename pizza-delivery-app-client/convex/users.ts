// import { v } from "convex/values";
// import { mutation } from "./_generated/server";
// import { pizza } from "./pizzas";
// import { useUser } from "@clerk/clerk-react";
// const { user } = useUser();

// export const users = mutation({
//     args: {
//         username: v.string(),
//         id: v.id(user?.id ?? ''),
//         isAdmin: v.boolean(),
//     },
//     async handler(ctx, args) {
//         await ctx.db.insert("user", {
//             username: args.username,
//         });
//     },
// });
