"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const Cart = () => {
  const { user } = useUser();
  const cart = useQuery(api.cart.getUserCartItems, { userId: user?.id || "" });
  const pizzass = useQuery(api.pizzas.getPizzas);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <div className="w-3/5 h-full">
        {cart?.map((cartItem) => {
          const pizza = pizzass?.find((p) => p._id === cartItem.pizzaId);
          return pizza ? (
            <div>
              <CardContainer className="inter-var w-full">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-5/6 h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl flex flex-row justify-between font-bold text-neutral-600 dark:text-white"
                  >
                    <div className="">{pizza.name}</div>
                    <div className="">₹ {pizza.price.small}</div>
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {pizza.toppings}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src={
                        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20 select-none">
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="rounded-2xl font-normal dark:text-white"
                    >
                      Select Type
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="rounded-2xl font-normal dark:text-white"
                    >
                      Value
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Checkout
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
              <Separator className="bg-primary my-20" />
            </div>
          ) : (
            "No Items in Cart."
          );
        })}
      </div>
    </div>
  );
};

// return (
//   <div className="">
//     <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
//       <div className="w-3/5 h-full">
//         {cart?.map((pizza, index) => (
//           <CardContainer className="inter-var w-full">
//             <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-5/6 h-auto rounded-xl p-6 border">
//               <CardItem
//                 translateZ="50"
//                 className="text-xl flex flex-row justify-between font-bold text-neutral-600 dark:text-white"
//               >
//                 <div className="">{pizza.pizzaId}</div>
//                 <div className="">₹ 10</div>
//               </CardItem>
//               <CardItem
//                 as="p"
//                 translateZ="60"
//                 className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
//               >
//                 Chees hi Chees
//               </CardItem>
//               <CardItem translateZ="100" className="w-full mt-4">
//                 <Image
//                   // src={images[index]}
//                   src={
//                     "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                   }
//                   height="1000"
//                   width="1000"
//                   className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
//                   alt="thumbnail"
//                 />
//               </CardItem>
//               <div className="flex justify-between items-center mt-20 select-none">
//                 <CardItem
//                   translateZ={20}
//                   as="button"
//                   className="rounded-2xl font-normal dark:text-white"
//                 >
//                   Select Type
//                 </CardItem>
//                 <CardItem
//                   translateZ={20}
//                   as="button"
//                   className="rounded-2xl font-normal dark:text-white"
//                 >
//                   Value
//                 </CardItem>
//                 <CardItem
//                   translateZ={20}
//                   as="button"
//                   className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
//                 >
//                   Checkout
//                 </CardItem>
//               </div>
//             </CardBody>
//           </CardContainer>
//         ))}
//         <Separator className="bg-primary my-20" />
//       </div>
//       <div className="mockup-window border border-base-300 md:mt-20 w-5/6 md:w-1/3 h-full">
//         <div className="flex justify-center border border-base-300 px-4 py-16 bg-secondary">
//           Buy Menu
//         </div>
//       </div>
//     </div>
//   </div>
// );

export default Cart;
