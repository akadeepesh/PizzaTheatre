"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Separator } from "@/components/ui/separator";
import Cart from "@/components/items";
import Head from "next/head";

import { Minus, Plus } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Pizza {
  name: string;
  toppings: string;
  price: string;
}

const pizzas: Pizza[] = [
  { name: "Cheese Lovers", toppings: "Classic Cheese Pizza", price: "129" },
  { name: "Veg Treat", toppings: "Cheese, Onion, Capsicum", price: "129" },
  {
    name: "Mexican Delight",
    toppings: "Cheese, Jalapeno, Golden Corn",
    price: "129",
  },
  {
    name: "Spicy Mushroom",
    toppings: "Special Colli Garlic Sauce, Onion, Capsicum, Mushroom",
    price: "169",
  },
  {
    name: "Spicy Paneer",
    toppings: "Special Colli Garlic Sauce, Onion, Capsicum, Paneer",
    price: "169",
  },
  {
    name: "Golden Choice",
    toppings: "Cheese, Onion, Sweet Corn, Paneer",
    price: "169",
  },
  {
    name: "Mixicana Veg Wonder",
    toppings: "Cheese, Onion, Capsicum, Tomatoes, Jalapenos",
    price: "169",
  },
  {
    name: "Paneer Makhni",
    toppings: "Spl. Makhni Sauce, Onion, Capsicum, Paneer",
    price: "199",
  },
  {
    name: "Tandoori Veggie Delight",
    toppings:
      "Cheese, Onion, Capsicum, Mushroom, Red Pepper with Spl Tandoori Sauce",
    price: "199",
  },
  {
    name: "Veggie Lover",
    toppings: "Cheese, Onion, Capsicum, Mushroom, Tomatoes",
    price: "199",
  },
  {
    name: "Tandoori Paneer",
    toppings:
      "Cheese, Onion, Capsicum, Red Pepper, Paneer with Spl. Tandoori Sauce",
    price: "299",
  },
  {
    name: "Margherita",
    toppings: "Tomato, Mozzarella, Basil",
    price: "149",
  },
  {
    name: "Pepperoni Feast",
    toppings: "Pepperoni, Cheese, Tomato Sauce",
    price: "179",
  },
  {
    name: "Hawaiian Delight",
    toppings: "Ham, Pineapple, Cheese",
    price: "169",
  },
  {
    name: "BBQ Chicken",
    toppings: "BBQ Sauce, Chicken, Red Onions",
    price: "189",
  },
  {
    name: "Supreme",
    toppings: "Pepperoni, Sausage, Bell Peppers, Onions, Olives",
    price: "199",
  },
  {
    name: "Buffalo Chicken",
    toppings: "Buffalo Sauce, Chicken, Ranch Dressing, Mozzarella",
    price: "189",
  },
  {
    name: "Mediterranean",
    toppings: "Spinach, Feta Cheese, Olives, Sun-Dried Tomatoes",
    price: "179",
  },
  {
    name: "Four Cheese",
    toppings: "Mozzarella, Cheddar, Gouda, Parmesan",
    price: "169",
  },
  {
    name: "Pesto Veggie",
    toppings: "Pesto Sauce, Mushrooms, Tomatoes, Bell Peppers",
    price: "179",
  },
  {
    name: "Meat Lover's",
    toppings: "Pepperoni, Sausage, Bacon, Ham",
    price: "209",
  },
];

// const images = [
//   "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

export function Items() {
  const pizzass = useQuery(api.pizzas.getPizzas);
  const [itemCount, setItemCount] = useState<number[]>(
    new Array(pizzas.length).fill(0)
  );
  const [cartItems, setCartItems] = useState<Pizza[]>([]);
  const newCounts = [...itemCount];

  const handleAddToCart = (index: number) => {
    newCounts[index]++;
    setItemCount(newCounts);
    const pizza = pizzas[index];
    setCartItems([...cartItems, pizza]);
    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleRemoveFromCart = (index: number) => {
    if (newCounts[index] > 0) {
      newCounts[index]--;
    }
    setItemCount(newCounts);

    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="flex flex-wrap justify-center max-w-screen-xl mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      {pizzass?.map((pizza, index) => (
        <CardContainer key={index} className="m-5">
          <CardBody className="bg-gray-50 tracking-tight md:tracking-wide relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[24rem] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-Anta  flex flex-row justify-between font-bold text-neutral-600 dark:text-white"
            >
              <div className="">{pizza.name}</div>
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
              className="text-neutral-500 font-Annapura text-sm max-w-sm mt-2 dark:text-neutral-300"
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
                    onClick={() => handleAddToCart(index)}
                    className="text-sm font-Annapura"
                  >
                    Add to Cart →
                  </div>
                ) : (
                  <div className="flex flex-row justify-evenly items-center cursor-default">
                    <div
                      onClick={() => handleRemoveFromCart(index)}
                      className="hover:bg-secondary rounded-md p-1 cursor-pointer"
                    >
                      <Minus size={20} />
                    </div>
                    <Separator orientation="vertical" className="bg-primary" />
                    <div>{itemCount[index]}</div>
                    <Separator orientation="vertical" className="bg-primary" />
                    <div
                      onClick={() => handleAddToCart(index)}
                      className="hover:bg-secondary rounded-md p-1 cursor-pointer"
                    >
                      <Plus size={20} />
                    </div>
                  </div>
                )}
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold font-Anta"
              >
                Buy Now
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      ))}
      <Cart cartItems={cartItems} />
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
