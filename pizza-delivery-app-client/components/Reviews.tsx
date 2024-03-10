"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const people = [
  {
    id: 1,
    name: "John Doe",
    pizza: "Cheese Lovers",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    pizza: "Mexican Delight",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    pizza: "Golden Choice",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    pizza: "Spicy Mushroom",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    pizza: "Paneer Makhni",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    pizza: "Tandooi Paneer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
  {
    id: 7,
    name: "Deepesh",
    pizza: "Pizza Theatre Special Veggie",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const testimonials = [
  {
    quote:
      "Exquisite! The pizza had a delightful blend of flavors, with a crust that was perfectly crisp on the outside and fluffy on the inside. Every bite was a culinary delight!",
    name: "@johndoe",
  },
  {
    quote:
      "Delicious beyond words! The pizza was a symphony of flavors, with fresh ingredients and a mouthwatering sauce that left me craving more. A definite must-try!",
    name: "@robertjohnson",
  },
  {
    quote:
      "Outstanding! The pizza was a culinary masterpiece, with a crust that was expertly baked and toppings that were bursting with freshness. Every bite was pure bliss!",
    name: "@janesmith",
  },
  {
    quote:
      "Phenomenal! This pizza exceeded all expectations, with a perfect balance of flavors and a crust that was simply divine. It's safe to say, this is now my go-to pizza spot!",
    name: "@emilydavis",
  },
  {
    quote:
      "Spectacular! From the first bite to the last, this pizza was a true delight. The crust was light and airy, the toppings were flavorful, and the overall experience was simply heavenly!",
    name: "@deepesh1710",
  },
];

const Reviews = () => {
  return (
    <div className="flex justify-center max-h-screen h-[96.5svh] md:h-[87.5svh]">
      <div className="flex mt-32">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-row w-3/4 md:w-full max-w-sm border-b border-spacing-4 border-primary rounded-3xl select-none h-fit justify-center mb-16 pb-4">
            <AnimatedTooltip items={people} />
          </div>
          <div className="rounded-md flex antialiased items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
