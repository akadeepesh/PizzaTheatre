import React, { useState } from "react";
import { motion } from "framer-motion";
import { PizzaIcon, Flame, Salad, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cart } from "@/components/CustomCart";
import { Pizza, PizzaOption, PizzaOptions } from "@/types/pizza";

const pizzaOptions: PizzaOptions = {
  bases: [
    { id: "thin", name: "Thin Crust", price: 150 },
    { id: "thick", name: "Thick Crust", price: 180 },
    { id: "stuffed", name: "Stuffed Crust", price: 220 },
    { id: "gluten-free", name: "Gluten-Free", price: 200 },
  ],
  sauces: [
    { id: "tomato", name: "Tomato", price: 20 },
    { id: "bbq", name: "BBQ", price: 30 },
    { id: "garlic", name: "Garlic", price: 30 },
    { id: "pesto", name: "Pesto", price: 40 },
  ],
  cheeses: [
    { id: "mozzarella", name: "Mozzarella", price: 40 },
    { id: "cheddar", name: "Cheddar", price: 40 },
    { id: "parmesan", name: "Parmesan", price: 50 },
    { id: "gouda", name: "Gouda", price: 50 },
  ],
  toppings: [
    { id: "pepperoni", name: "Pepperoni", price: 30 },
    { id: "mushrooms", name: "Mushrooms", price: 20 },
    { id: "onions", name: "Onions", price: 20 },
    { id: "sausage", name: "Sausage", price: 30 },
    { id: "bellPeppers", name: "Bell Peppers", price: 20 },
    { id: "olives", name: "Olives", price: 20 },
    { id: "ham", name: "Ham", price: 30 },
    { id: "pineapple", name: "Pineapple", price: 20 },
  ],
};

const PizzaBuilder: React.FC = () => {
  const [base, setBase] = useState<string>("");
  const [sauce, setSauce] = useState<string>("");
  const [cheese, setCheese] = useState<string>("");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [cart, setCart] = useState<Pizza[]>([]);

  const calculatePrice = (): number => {
    const basePrice = pizzaOptions.bases.find((b) => b.id === base)?.price || 0;
    const saucePrice =
      pizzaOptions.sauces.find((s) => s.id === sauce)?.price || 0;
    const cheesePrice =
      pizzaOptions.cheeses.find((c) => c.id === cheese)?.price || 0;
    const toppingsPrice = selectedToppings.reduce((sum, t) => {
      const topping = pizzaOptions.toppings.find((top) => top.id === t);
      return sum + (topping?.price || 0);
    }, 0);
    return basePrice + saucePrice + cheesePrice + toppingsPrice;
  };

  const handleAddToCart = () => {
    if (!base || !sauce || !cheese) {
      alert("Please select a base, sauce, and cheese before adding to cart.");
      return;
    }
    const newPizza: Pizza = {
      base,
      sauce,
      cheese,
      toppings: selectedToppings,
      price: calculatePrice(),
    };
    setCart([...cart, newPizza]);
    // Reset selections
    setBase("");
    setSauce("");
    setCheese("");
    setSelectedToppings([]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const OptionCard: React.FC<{
    title: string;
    options: PizzaOption[];
    icon: React.ReactNode;
    selectedValue: string | string[];
    onChange: (value: string | string[]) => void;
    multiple?: boolean;
  }> = ({
    title,
    options,
    icon,
    selectedValue,
    onChange,
    multiple = false,
  }) => (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 w-full rounded-md">
          <div className="grid grid-cols-2 gap-2 p-2">
            {options.map((option) => (
              <Button
                key={option.id}
                variant={
                  multiple
                    ? (selectedValue as string[]).includes(option.id)
                      ? "default"
                      : "outline"
                    : selectedValue === option.id
                      ? "default"
                      : "outline"
                }
                className="justify-start"
                onClick={() => {
                  if (multiple) {
                    const newValue = (selectedValue as string[]).includes(
                      option.id,
                    )
                      ? (selectedValue as string[]).filter(
                          (id) => id !== option.id,
                        )
                      : [...(selectedValue as string[]), option.id];
                    onChange(newValue);
                  } else {
                    onChange(option.id);
                  }
                }}
              >
                <span className="truncate">{option.name}</span>
                <Badge variant="secondary" className="ml-auto">
                  ₹{option.price}
                </Badge>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6 mt-20">
      <motion.h1
        className="text-4xl font-bold text-primary mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Craft Your Dream Pizza
      </motion.h1>

      <Tabs defaultValue="base" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="base">Base</TabsTrigger>
          <TabsTrigger value="sauce">Sauce</TabsTrigger>
          <TabsTrigger value="cheese">Cheese</TabsTrigger>
          <TabsTrigger value="toppings">Toppings</TabsTrigger>
        </TabsList>
        <TabsContent value="base">
          <OptionCard
            title="Choose Your Base"
            options={pizzaOptions.bases}
            icon={<PizzaIcon className="w-6 h-6" />}
            selectedValue={base}
            onChange={(value) => setBase(value as string)}
          />
        </TabsContent>
        <TabsContent value="sauce">
          <OptionCard
            title="Select Your Sauce"
            options={pizzaOptions.sauces}
            icon={<Flame className="w-6 h-6" />}
            selectedValue={sauce}
            onChange={(value) => setSauce(value as string)}
          />
        </TabsContent>
        <TabsContent value="cheese">
          <OptionCard
            title="Pick Your Cheese"
            options={pizzaOptions.cheeses}
            icon={<PizzaIcon className="w-6 h-6" />}
            selectedValue={cheese}
            onChange={(value) => setCheese(value as string)}
          />
        </TabsContent>
        <TabsContent value="toppings">
          <OptionCard
            title="Choose Your Toppings"
            options={pizzaOptions.toppings}
            icon={<Salad className="w-6 h-6" />}
            selectedValue={selectedToppings}
            onChange={(value) => setSelectedToppings(value as string[])}
            multiple
          />
        </TabsContent>
      </Tabs>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {base && sauce && cheese && selectedToppings.length > 0 ? (
          <Button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Add to Cart (₹{calculatePrice().toFixed(2)})
          </Button>
        ) : (
          <p className="text-muted-foreground">
            Select a base, sauce, cheese, and toppings to add to cart.
          </p>
        )}
      </motion.div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="fixed bottom-4 right-4 z-50 rounded-full p-4"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span className="sr-only">Cart</span>
            <Badge variant="secondary" className="ml-2">
              {cart.length}
            </Badge>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Your Pizza Cart</SheetTitle>
            <SheetDescription>Review your custom pizzas here.</SheetDescription>
          </SheetHeader>
          <Cart pizzas={cart} onRemove={removeFromCart} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PizzaBuilder;
