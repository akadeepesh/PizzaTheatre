"use client";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import Head from "next/head";

type CartItem = {
  _id: Id<"cart">;
  pizzaId: Id<"pizza">;
  size: string;
  quantity: number;
};

export function Items() {
  const { user } = useUser();
  const pizzas = useQuery(api.pizzas.getPizzas);
  const updateCartItem = useMutation(api.cart.updateCartItem);
  const deleteCartItem = useMutation(api.cart.deleteCartItem);
  const getCart = useQuery(api.cart.getUserCartItems, {
    userId: user?.id || "",
  });

  const [itemCount, setItemCount] = useState<{
    [key: string]: { [size: string]: number };
  }>({});
  const [selectedSize, setSelectedSize] = useState<{ [key: string]: string }>(
    {},
  );

  useEffect(() => {
    if (pizzas && getCart) {
      const newItemCount: { [key: string]: { [size: string]: number } } = {};
      const newSelectedSize: { [key: string]: string } = {};
      pizzas.forEach((pizza) => {
        newItemCount[pizza._id] = { small: 0, medium: 0 };
        newSelectedSize[pizza._id] = "small";
      });
      getCart.forEach((item: CartItem) => {
        if (newItemCount[item.pizzaId]) {
          newItemCount[item.pizzaId][item.size] = item.quantity;
        }
      });
      setItemCount(newItemCount);
      setSelectedSize(newSelectedSize);
    }
  }, [pizzas, getCart]);

  const handleAddToCart = async (pizzaId: Id<"pizza">, size: string) => {
    try {
      const newCount =
        ((itemCount[pizzaId] && itemCount[pizzaId][size]) || 0) + 1;
      setItemCount({
        ...itemCount,
        [pizzaId]: { ...itemCount[pizzaId], [size]: newCount },
      });

      await updateCartItem({
        userId: user?.id || "",
        pizzaId,
        size,
        quantity: newCount,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      setItemCount({
        ...itemCount,
        [pizzaId]: {
          ...itemCount[pizzaId],
          [size]: itemCount[pizzaId]?.[size] || 0,
        },
      });
    }
  };

  const handleRemoveFromCart = async (pizzaId: Id<"pizza">, size: string) => {
    try {
      const newCount = Math.max(
        ((itemCount[pizzaId] && itemCount[pizzaId][size]) || 0) - 1,
        0,
      );
      setItemCount({
        ...itemCount,
        [pizzaId]: { ...itemCount[pizzaId], [size]: newCount },
      });

      if (newCount === 0) {
        await deleteCartItem({
          userId: user?.id || "",
          pizzaId,
          size,
        });
      } else {
        await updateCartItem({
          userId: user?.id || "",
          pizzaId,
          size,
          quantity: newCount,
        });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      setItemCount({
        ...itemCount,
        [pizzaId]: {
          ...itemCount[pizzaId],
          [size]: itemCount[pizzaId]?.[size] || 0,
        },
      });
    }
  };

  const handleSizeChange = async (pizzaId: Id<"pizza">, size: string) => {
    setSelectedSize({ ...selectedSize, [pizzaId]: size });
  };

  if (!pizzas) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap justify-center max-w-screen-xl mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      {pizzas.map((pizza) => (
        <CardContainer key={pizza._id} className="m-5">
          <CardBody className="bg-gray-50 tracking-tight md:tracking-wide relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto md:w-96 h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-Anta flex flex-row justify-between font-bold text-neutral-600 dark:text-white"
            >
              <div className="select-text">{pizza.name}</div>
              <div className="">
                <Select
                  value={selectedSize[pizza._id] || "small"}
                  onValueChange={(value) => handleSizeChange(pizza._id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select Size`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">
                      ₹ {pizza.price.small} - S
                    </SelectItem>
                    <SelectItem value="medium">
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
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                {(itemCount[pizza._id]?.[selectedSize[pizza._id]] || 0) ===
                0 ? (
                  <div
                    onClick={() =>
                      handleAddToCart(pizza._id, selectedSize[pizza._id])
                    }
                    className="text-sm font-Annapura"
                  >
                    Add to Cart →
                  </div>
                ) : (
                  <div className="flex flex-row justify-evenly items-center cursor-default">
                    {(itemCount[pizza._id]?.[selectedSize[pizza._id]] || 0) ===
                    1 ? (
                      <div
                        onClick={() =>
                          handleRemoveFromCart(
                            pizza._id,
                            selectedSize[pizza._id],
                          )
                        }
                        className="hover:bg-secondary rounded-md p-1 cursor-pointer"
                      >
                        <Trash2 size={20} />
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          handleRemoveFromCart(
                            pizza._id,
                            selectedSize[pizza._id],
                          )
                        }
                        className="hover:bg-secondary rounded-md p-1 cursor-pointer"
                      >
                        <Minus size={20} />
                      </div>
                    )}
                    <Separator orientation="vertical" className="bg-primary" />
                    <div>
                      {itemCount[pizza._id]?.[selectedSize[pizza._id]] || 0}
                    </div>
                    <Separator orientation="vertical" className="bg-primary" />
                    <div
                      onClick={() =>
                        handleAddToCart(pizza._id, selectedSize[pizza._id])
                      }
                      className="hover:bg-secondary rounded-md p-1 cursor-pointer"
                    >
                      <Plus size={20} />
                    </div>
                  </div>
                )}
              </CardItem>
              <div className="w-full cursor-pointer">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold font-Anta"
                >
                  Buy Now
                </CardItem>
              </div>
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
