import Navbar from "@/components/Navbar";
import React from "react";

const cart = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-wrap flex-row justify-between max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36 bg-white">
        <div className="bg-red-500 w-3/5 h-full">cart items</div>
        <div className="bg-lime-500 w-1/3 h-full">buy menu</div>
      </div>
    </div>
  );
};

export default cart;
