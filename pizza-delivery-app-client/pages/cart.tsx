"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { NextSeo } from "next-seo";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type CartItem = {
  _id: Id<"cartItems">;
  pizzaId: Id<"pizzas">;
  size: "small" | "medium";
  quantity: number;
};

type Pizza = {
  _id: Id<"pizzas">;
  name: string;
  toppings: string[];
  smallPrice: number;
  mediumPrice: number;
  imageUrl?: string;
};

export default function Cart() {
  const { user, isLoaded } = useUser();
  const cartItems = useQuery(api.cart.getUserCartItems);
  const pizzas = useQuery(api.pizzas.getPizzas) as Pizza[] | undefined;
  const deleteCartItem = useMutation(api.cart.deleteCartItem);
  const updateCartItemQuantity = useMutation(api.cart.updateCartItemQuantity);
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (cartItems) {
      setCart(cartItems);
    }
  }, [cartItems]);

  const handleUpdateQuantity = async (
    pizzaId: Id<"pizzas">,
    size: "small" | "medium",
    quantityChange: number,
  ) => {
    try {
      await updateCartItemQuantity({
        pizzaId,
        size,
        quantityChange,
      });
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const handleDeleteCartItem = async (
    pizzaId: Id<"pizzas">,
    size: "small" | "medium",
  ) => {
    try {
      await deleteCartItem({
        pizzaId,
        size,
      });
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const pizza = pizzas?.find((p) => p._id === item.pizzaId);
      if (!pizza) return total;
      const price =
        item.size === "small" ? pizza.smallPrice : pizza.mediumPrice;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start max-w-screen-xl mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36 px-4 lg:px-8">
      <NextSeo
        title={isLoaded ? `${user?.fullName} | Cart` : "Loading..."}
        description="Pizza Theater Cart, where you can see and manage all the items you have added to your cart."
        canonical="https://pizza-theater.vercel.app/"
        openGraph={{
          url: "https://pizza-theater.vercel.app/",
          title: "Pizza Theater",
          description:
            "Pizza Theater is a Pizza ordering app that allows you to order your favorite pizza from the comfort of your home.",
          siteName: "Pizza Theater",
        }}
      />
      <div className="w-full lg:w-2/3 mb-8 lg:mb-0 pr-0 lg:pr-8">
        <AnimatePresence>
          {cart.length > 0 ? (
            cart.map((cartItem) => {
              const pizza = pizzas?.find((p) => p._id === cartItem.pizzaId);
              return pizza ? (
                <motion.div
                  key={cartItem._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-6 overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
                    <div className="flex flex-col lg:flex-row">
                      <div className="w-full lg:w-1/2 relative h-48 lg:h-auto">
                        <Image
                          src={
                            pizza.imageUrl ||
                            "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          }
                          alt={pizza.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-md lg:rounded-l-md lg:rounded-t-none"
                        />
                      </div>
                      <div className="flex flex-col w-full lg:w-1/2 p-4">
                        <CardHeader className="p-0 mb-2">
                          <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                            {pizza.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                            {pizza.toppings.join(", ")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 mb-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Size:{" "}
                            <span className="font-semibold">
                              {cartItem.size.charAt(0).toUpperCase() +
                                cartItem.size.slice(1)}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Price:{" "}
                            <span className="font-semibold">
                              ₹
                              {cartItem.size === "small"
                                ? pizza.smallPrice
                                : pizza.mediumPrice}
                            </span>
                          </p>
                        </CardContent>
                        <CardFooter className="p-0 flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() =>
                                cartItem.quantity === 1
                                  ? handleDeleteCartItem(
                                      pizza._id,
                                      cartItem.size,
                                    )
                                  : handleUpdateQuantity(
                                      pizza._id,
                                      cartItem.size,
                                      -1,
                                    )
                              }
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
                            >
                              {cartItem.quantity === 1 ? (
                                <Trash2
                                  size={16}
                                  className="text-red-500 dark:text-red-400"
                                />
                              ) : (
                                <Minus size={16} />
                              )}
                            </Button>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              {cartItem.quantity}
                            </span>
                            <Button
                              onClick={() =>
                                handleUpdateQuantity(
                                  pizza._id,
                                  cartItem.size,
                                  1,
                                )
                              }
                              size="sm"
                              variant="outline"
                              className="hover:bg-green-100 dark:hover:bg-green-900 transition-colors duration-200"
                            >
                              <Plus
                                size={16}
                                className="text-green-500 dark:text-green-400"
                              />
                            </Button>
                          </div>
                          <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                            ₹
                            {(cartItem.size === "small"
                              ? pizza.smallPrice
                              : pizza.mediumPrice) * cartItem.quantity}
                          </p>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : null;
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="p-8 text-center bg-white dark:bg-gray-800">
                <ShoppingCart
                  size={48}
                  className="mx-auto mb-4 text-gray-400 dark:text-gray-500"
                />
                <p className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Your cart is empty
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Add some delicious pizzas to get started!
                </p>
                <Button onClick={() => router.push("/menu")}>
                  Continue Shopping
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
        <Card className="shadow-lg bg-white dark:bg-gray-800">
          <CardHeader className="bg-primary text-primary-foreground dark:bg-primary-dark dark:text-primary-dark-foreground">
            <CardTitle className="text-2xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal:
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ₹{getTotal()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Delivery Fee:
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {cart.length === 0 ? "₹0" : "₹50"}
                </span>
              </div>
              <Separator className="bg-gray-200 dark:bg-gray-700" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900 dark:text-gray-100">Total:</span>
                <span className="text-gray-900 dark:text-gray-100">
                  ₹{cart.length === 0 ? 0 : getTotal() + 50}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full text-lg py-6 bg-primary hover:bg-primary-dark text-primary-foreground dark:bg-primary-dark dark:hover:bg-primary dark:text-primary-dark-foreground"
              onClick={() => router.push("/checkout")}
              disabled={cart.length === 0}
            >
              {cart.length === 0 ? "Cart is Empty" : "Proceed to Checkout"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
