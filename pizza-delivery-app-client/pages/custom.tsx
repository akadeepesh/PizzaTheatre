import React from "react";
import Head from "next/head";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";

const custom = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center max-w-screen-md mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
        <Head>
          <title>Make Your Custom Pizza</title>
        </Head>
        <div className="bg-secondary w-full text-primary rounded-lg">
          <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />
            <Label
              className={cn("md:text-4xl font-Anta text-xl relative z-20")}
            >
              Create Your Pizza
            </Label>
            <div className="text-center mt-2 text-neutral-300 relative z-20">
              <div className="p-6">
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a Base" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pizza Bases</SelectLabel>
                      <SelectItem value="TC">Thin Crust</SelectItem>
                      <SelectItem value="NYS">New York Style</SelectItem>
                      <SelectItem value="DD">Deep Dish</SelectItem>
                      <SelectItem value="S">Sourdough</SelectItem>
                      <SelectItem value="N">Neapolitan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="">Options :</div>
          <div className="">choose pizza base from 5 bases</div>
          <div className="">choose any sauce from 5 options</div>
          <div className="">choose any cheese type</div>
          <div className="">opt veggies from many options</div>
        </div>
      </div>
    </>
  );
};

export default custom;
