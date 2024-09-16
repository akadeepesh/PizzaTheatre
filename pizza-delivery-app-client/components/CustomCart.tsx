import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pizza } from "@/types/pizza";
import { Trash2, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartProps {
  pizzas: Pizza[];
  onRemove: (index: number) => void;
}

export const Cart: React.FC<CartProps> = ({ pizzas, onRemove }) => {
  const total = pizzas.reduce((sum, pizza) => sum + pizza.price, 0);

  return (
    <div className="flex flex-col h-[93%]">
      {pizzas.length === 0 ? (
        <div className="flex-grow flex items-center justify-center flex-col text-muted-foreground">
          <ShoppingCart className="w-16 h-16 mb-4" />
          <p className="text-lg">Your cart is empty</p>
        </div>
      ) : (
        <ScrollArea className="flex-grow mb-4 pr-4">
          <AnimatePresence>
            {pizzas.map((pizza, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="mb-4 p-4 bg-accent rounded-lg relative group"
              >
                <h3 className="font-bold text-lg">Custom Pizza #{index + 1}</h3>
                <p className="text-sm text-muted-foreground">
                  Base: {pizza.base}
                </p>
                <p className="text-sm text-muted-foreground">
                  Sauce: {pizza.sauce}
                </p>
                <p className="text-sm text-muted-foreground">
                  Cheese: {pizza.cheese}
                </p>
                <p className="text-sm text-muted-foreground">
                  Toppings: {pizza.toppings.join(", ")}
                </p>
                <p className="font-bold mt-2 text-primary">
                  ₹{pizza.price.toFixed(2)}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onRemove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      )}
      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-2xl font-bold text-primary">
            ₹{total.toFixed(2)}
          </span>
        </div>
        <Button className="w-full" size="lg" disabled={pizzas.length === 0}>
          {pizzas.length === 0 ? "Cart is Empty" : "Proceed to Checkout"}
        </Button>
      </div>
    </div>
  );
};
