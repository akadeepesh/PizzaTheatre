// types/pizza.ts

export interface PizzaOption {
  id: string;
  name: string;
  price: number;
}

export interface PizzaOptions {
  bases: PizzaOption[];
  sauces: PizzaOption[];
  cheeses: PizzaOption[];
  toppings: PizzaOption[];
}

export interface Pizza {
  base: string;
  sauce: string;
  cheese: string;
  toppings: string[];
  price: number;
}
