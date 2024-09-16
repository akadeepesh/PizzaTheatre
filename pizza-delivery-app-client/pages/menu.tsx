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

type Pizza = {
  _id: Id<"pizzas">;
  name: string;
  toppings: string[];
  smallPrice: number;
  mediumPrice: number;
  imageUrl?: string;
};

export function Items() {
  const pizzas = useQuery(api.pizzas.getPizzas) as Pizza[] | undefined;
  const addToCart = useMutation(api.cart.addToCart);
  const updateCartItemQuantity = useMutation(api.cart.updateCartItemQuantity);
  const deleteCartItem = useMutation(api.cart.deleteCartItem);
  const getCart = useQuery(api.cart.getUserCartItems);

  const [selectedSize, setSelectedSize] = useState<{
    [key: string]: "small" | "medium";
  }>({});
  ``;
  useEffect(() => {
    if (pizzas) {
      const newSelectedSize: { [key: string]: "small" | "medium" } = {};
      pizzas.forEach((pizza) => {
        newSelectedSize[pizza._id] = "small";
      });
      setSelectedSize(newSelectedSize);
    }
  }, [pizzas]);

  const getCartItemQuantity = (
    pizzaId: Id<"pizzas">,
    size: "small" | "medium",
  ) => {
    return (
      getCart?.find((item) => item.pizzaId === pizzaId && item.size === size)
        ?.quantity || 0
    );
  };

  const handleAddToCart = async (
    pizzaId: Id<"pizzas">,
    size: "small" | "medium",
  ) => {
    try {
      await addToCart({
        pizzaId,
        size,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

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

  const handleSizeChange = (
    pizzaId: Id<"pizzas">,
    size: "small" | "medium",
  ) => {
    setSelectedSize({ ...selectedSize, [pizzaId]: size });
  };

  if (!pizzas) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap justify-center max-w-screen-xl mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      {pizzas.map((pizza) => {
        const size = selectedSize[pizza._id] || "small";
        const quantity = getCartItemQuantity(pizza._id, size);
        const price = size === "small" ? pizza.smallPrice : pizza.mediumPrice;

        return (
          <CardContainer key={pizza._id} className="m-5">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto md:w-96 h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white flex justify-between items-center"
              >
                <span className="font-Anta">{pizza.name}</span>
                <Select
                  value={size}
                  onValueChange={(value) =>
                    handleSizeChange(pizza._id, value as "small" | "medium")
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">
                      ₹ {pizza.smallPrice} - S
                    </SelectItem>
                    <SelectItem value="medium">
                      ₹ {pizza.mediumPrice} - M
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 font-Annapura"
              >
                {pizza.toppings.join(", ")}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src={pizza.imageUrl || "https://via.placeholder.com/400x240"}
                  height={240}
                  width={400}
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt={pizza.name}
                />
              </CardItem>
              <div className="flex justify-between items-center mt-6">
                <CardItem
                  translateZ={20}
                  className="text-2xl font-bold dark:text-white"
                >
                  ₹{price}
                </CardItem>
                <CardItem
                  translateZ={20}
                  className="flex items-center justify-end space-x-2"
                >
                  {quantity === 0 ? (
                    <button
                      onClick={() => handleAddToCart(pizza._id, size)}
                      className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          quantity === 1
                            ? handleDeleteCartItem(pizza._id, size)
                            : handleUpdateQuantity(pizza._id, size, -1)
                        }
                        className="p-1 bg-secondary rounded-md"
                      >
                        {quantity === 1 ? (
                          <Trash2 size={20} />
                        ) : (
                          <Minus size={20} />
                        )}
                      </button>
                      <Separator
                        className="w-[1px] h-6 bg-muted-foreground"
                        orientation="vertical"
                      />
                      <span className="font-bold">{quantity}</span>
                      <Separator
                        className="w-[1px] h-6 bg-muted-foreground"
                        orientation="vertical"
                      />
                      <button
                        onClick={() => handleUpdateQuantity(pizza._id, size, 1)}
                        className="p-1 bg-secondary rounded-md"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  )}
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        );
      })}
    </div>
  );
}

const Menu = () => {
  return (
    <div>
      <Head>
        <title>Pizza Theatre | Menu</title>
      </Head>
      <Items />
    </div>
  );
};

export default Menu;
