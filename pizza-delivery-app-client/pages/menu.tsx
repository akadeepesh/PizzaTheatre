"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Separator } from "@/components/ui/separator";
import Head from "next/head";

import { Minus, Plus, Trash2, CheckCircle } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";

export function Items() {
  const { user } = useUser();
  const pizzas = useQuery(api.pizzas.getPizzas);
  const addtoCart = useMutation(api.cart.cartItem);
  const updateCart = useMutation(api.cart.updateTask);
  const delCart = useMutation(api.cart.deleteTask);
  const getcart = useQuery(api.cart.getUserCartItems, {
    userId: user?.id || "",
  });
  const [itemCount, setItemCount] = useState<number[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (pizzas) {
      setItemCount(new Array(pizzas.length).fill(0));
    }
  }, [pizzas]);

  const AddToCart = (index: number, pizzaId: string) => {
    const newCounts = [...itemCount];
    newCounts[index]++;
    setItemCount(newCounts);
    if (newCounts[index] === 1) {
      addtoCart({
        userId: String(user?.id),
        pizzaId: pizzaId,
        quantity: 1,
      });
    } else {
      getcart?.map((cartItem) => {
        if (newCounts[index] === 1 && cartItem.quantity === 0) {
          addtoCart({
            userId: String(user?.id),
            pizzaId: pizzaId,
            quantity: 1,
          });
        }
        if (cartItem.pizzaId === pizzaId) {
          updateCart({
            id: cartItem._id,
            quantity: newCounts[index],
          });
        }
      });
    }
    setAdded(true);
  };

  const handleRemoveFromCart = (index: number, pizzaId: string) => {
    const newCounts = [...itemCount];
    if (newCounts[index] > 0) {
      newCounts[index]--;
      setItemCount(newCounts);
      getcart?.map((cartItem) => {
        if (cartItem.pizzaId === pizzaId) {
          updateCart({
            id: cartItem._id,
            quantity: newCounts[index],
          });
        }
      });
    }
  };

  const deleteFromCart = (index: number, pizzaId: string) => {
    const newCounts = [...itemCount];
    newCounts[index] = 0;
    setItemCount(newCounts);
    const indexToRemove = itemCount.findIndex(
      (index) => getcart?.[index]?.pizzaId === pizzaId
    );

    if (indexToRemove !== -1) {
      newCounts[indexToRemove] = 0;
      setItemCount(newCounts);

      const cartItemToDelete = getcart?.find(
        (cartItem) => cartItem.pizzaId === pizzaId
      );
      if (cartItemToDelete) {
        delCart({ id: cartItemToDelete._id });
      }
    }
  };

  return (
    <div className="flex flex-wrap justify-center max-w-screen-xl mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      {pizzas?.map((pizza, index) => (
        <CardContainer key={index} className="m-5">
          <CardBody className="bg-gray-50 tracking-tight md:tracking-wide relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[24rem] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-Anta flex flex-row justify-between font-bold text-neutral-600 dark:text-white"
            >
              <div className="select-text">{pizza.name}</div>
              <div className="">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={`₹ ${pizza.price.small} - S`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={pizza.price.small} defaultChecked={true}>
                      ₹ {pizza.price.small} - S
                    </SelectItem>
                    <SelectItem value={pizza.price.medium}>
                      ₹ {pizza.price.medium} - M
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 font-Annapura select-text text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              {pizza.toppings}
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                // src={images[index]}
                src={
                  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20 gap-20 select-none">
              <CardItem
                translateZ={20}
                as="button"
                className="rounded-2xl font-normal dark:text-white"
              >
                {itemCount[index] === 0 ? (
                  <div
                    onClick={() => AddToCart(index, pizza._id)}
                    className="text-sm font-Annapura"
                  >
                    Add to Cart →
                  </div>
                ) : (
                  <div className="flex flex-row justify-evenly items-center cursor-default">
                    {itemCount[index] === 1 ? (
                      <div
                        onClick={() => deleteFromCart(index, pizza._id)}
                        className="hover:bg-secondary rounded-md p-1 cursor-pointer"
                      >
                        <Trash2 size={20} />
                      </div>
                    ) : (
                      <div
                        onClick={() => handleRemoveFromCart(index, pizza._id)}
                        className="hover:bg-secondary rounded-md p-1 cursor-pointer"
                      >
                        <Minus size={20} />
                      </div>
                    )}
                    <Separator orientation="vertical" className="bg-primary" />
                    <div>{itemCount[index]}</div>
                    <Separator orientation="vertical" className="bg-primary" />
                    <div
                      onClick={() => AddToCart(index, pizza._id)}
                      className="hover:bg-secondary rounded-md p-1 cursor-pointer"
                    >
                      <Plus size={20} />
                    </div>
                  </div>
                )}
              </CardItem>
              {itemCount[index] === 0 || itemCount[index] === 1 ? (
                <div className="w-full cursor-pointer">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold font-Anta"
                  >
                    Buy Now
                  </CardItem>
                </div>
              ) : (
                <div className="w-full cursor-pointer">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold font-Anta"
                  >
                    {added ? (
                      <div className="flex flex-row items-center justify-center gap-1">
                        <CheckCircle className=" text-green-500" size={16} />{" "}
                        Added
                      </div>
                    ) : (
                      <div
                        onClick={() => AddToCart(index, pizza._id)}
                        className=""
                      >
                        Add {itemCount[index]} To Cart
                      </div>
                    )}
                  </CardItem>
                </div>
              )}
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}

const Menu = () => {
  return (
    <div className="">
      <Head>
        <title>Pizza Theatre | Menu</title>
      </Head>
      <Items />
    </div>
  );
};

export default Menu;
