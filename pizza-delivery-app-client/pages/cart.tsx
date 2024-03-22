"use client";
import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
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

const Cart = () => {
  const { user, isLoaded } = useUser();
  const cart = useQuery(api.cart.getUserCartItems, { userId: user?.id || "" });
  const pizzass = useQuery(api.pizzas.getPizzas);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <div className="w-3/5 h-full">
        <NextSeo
          title={isLoaded ? `${user?.fullName} | Cart` : "Loading..."}
          description="Pizza Theater Cart, where you can see and manage all the items you have added to your cart."
          canonical="https://pizza-theater.vercel.app/"
          openGraph={{
            url: "https://pizza-theater.vercel.app/",
            title: "Pizza Theater",
            description:
              "Pizza Theater is an Pizza ordering app that allows you to order your favorite pizza from the comfort of your home.",
            siteName: "Pizza Theater",
          }}
        />
        {cart?.map((cartItem) => {
          const pizza = pizzass?.find((p) => p._id === cartItem.pizzaId);
          return pizza ? (
            <div>
              {/* <div className="card lg:card-side bg-secondary shadow-xl">
                <figure>
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Album"
                    className="w-full h-full"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{pizza.name}</h2>
                  <p>{pizza.toppings}</p>
                  <div className="card-actions flex flex-row justify-end">
                    {cartItem.quantity}
                    <button className="btn btn-primary">
                      {cartItem.size === "small"
                        ? `${pizza.price.small}`
                        : `${pizza.price.medium}`}
                    </button>
                  </div>
                </div>
              </div> */}
              <Card className="">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex w-1/2">
                    <img
                      src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Album"
                      className="rounded-es-md rounded-ss-md"
                    />
                  </div>
                  <div className="flex flex-row lg:flex-col w-1/2">
                    <CardHeader>
                      <CardTitle>{pizza.name}</CardTitle>
                      <CardDescription>{pizza.toppings}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                      <div className="card-actions flex flex-row justify-end">
                        <Button className="">
                          {cartItem.quantity} {" X "}
                          {cartItem.size === "small"
                            ? `${pizza.price.small}`
                            : `${pizza.price.medium}`}
                        </Button>
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>

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

export default Cart;
