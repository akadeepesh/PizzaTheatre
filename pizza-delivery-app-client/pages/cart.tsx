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
import { Minus, Plus, Trash2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

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

const Cart = () => {
  const { user, isLoaded } = useUser();
  const cartItems = useQuery(api.cart.getUserCartItems, {
    userId: user?.id || "",
  }) as CartItem[] | undefined;
  const pizzas = useQuery(api.pizzas.getPizzas) as Pizza[] | undefined;
  const updateCartItem = useMutation(api.cart.updateCartItem);
  const deleteCartItem = useMutation(api.cart.deleteCartItem);

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (cartItems) {
      setCart(cartItems);
    }
  }, [cartItems]);

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity > 0) {
      await updateCartItem({
        userId: user?.id || "",
        pizzaId: item.pizzaId,
        size: item.size,
        quantity: newQuantity,
      });
      setCart(
        cart.map((i) =>
          i._id === item._id ? { ...i, quantity: newQuantity } : i,
        ),
      );
    } else {
      await deleteCartItem({
        userId: user?.id || "",
        pizzaId: item.pizzaId,
        size: item.size,
      });
      setCart(cart.filter((i) => i._id !== item._id));
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
    <div className="flex flex-col lg:flex-row justify-between items-start max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
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
      <div className="w-full lg:w-3/5 mb-8 lg:mb-0">
        {cart.length > 0 ? (
          cart.map((cartItem) => {
            const pizza = pizzas?.find((p) => p._id === cartItem.pizzaId);
            return pizza ? (
              <div key={cartItem._id}>
                <Card className="mb-6">
                  <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2">
                      <Image
                        src={
                          pizza.imageUrl ||
                          "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt={pizza.name}
                        width={300}
                        height={200}
                        className="rounded-t-md lg:rounded-l-md lg:rounded-t-none w-full h-48 object-cover"
                      />
                    </div>
                    <div className="flex flex-col w-full lg:w-1/2 p-4">
                      <CardHeader className="p-0 mb-2">
                        <CardTitle>{pizza.name}</CardTitle>
                        <CardDescription>
                          {pizza.toppings.join(", ")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 mb-2">
                        <p>
                          Size:{" "}
                          {cartItem.size.charAt(0).toUpperCase() +
                            cartItem.size.slice(1)}
                        </p>
                        <p>
                          Price: ₹
                          {cartItem.size === "small"
                            ? pizza.smallPrice
                            : pizza.mediumPrice}
                        </p>
                      </CardContent>
                      <CardFooter className="p-0 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() =>
                              handleQuantityChange(
                                cartItem,
                                cartItem.quantity - 1,
                              )
                            }
                            size="sm"
                            variant="outline"
                          >
                            {cartItem.quantity === 1 ? (
                              <Trash2 size={16} />
                            ) : (
                              <Minus size={16} />
                            )}
                          </Button>
                          <span>{cartItem.quantity}</span>
                          <Button
                            onClick={() =>
                              handleQuantityChange(
                                cartItem,
                                cartItem.quantity + 1,
                              )
                            }
                            size="sm"
                            variant="outline"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                        <p className="font-bold">
                          ₹
                          {(cartItem.size === "small"
                            ? pizza.smallPrice
                            : pizza.mediumPrice) * cartItem.quantity}
                        </p>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              </div>
            ) : null;
          })
        ) : (
          <p>No items in cart.</p>
        )}
      </div>
      <div className="w-full lg:w-2/5 lg:ml-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{getTotal()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee:</span>
              <span>₹50</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>₹{getTotal() + 50}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Proceed to Checkout</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
