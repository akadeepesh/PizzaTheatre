import Navbar from "@/components/Navbar";
import React from "react";
import { Items } from "./menu";

const cart = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-wrap flex-row justify-between max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
        <div className="bg-primary w-3/5 h-full">
          <Items />
        </div>
        <div className="mockup-window border border-base-300 mt-20 w-1/3 h-full">
          <div className="flex justify-center border border-base-300 px-4 py-16 bg-secondary">
            Buy Menu
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;
