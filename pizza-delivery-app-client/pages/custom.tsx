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
import { Boxes } from "@/components/ui/BackgroundBoxes";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const custom = () => {
  return (
    <div className="flex flex-wrap justify-center max-w-screen-md mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <Head>
        <title>Make Your Custom Pizza</title>
      </Head>
      <div className="bg-secondary w-full text-primary rounded-lg">
        <div className="relative w-full overflow-hidden bg-seconday flex flex-col items-center justify-center rounded-lg">
          <div className="absolute inset-0 w-full h-full bg-primary [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
          <Label
            className={cn(
              "md:text-4xl bg-gradient-to-br from-yellow-100 to-orange-500 bg-clip-text text-transparent font-Anta mt-10 text-xl relative"
            )}
          >
            Create Your Pizza
          </Label>
          <div className="text-center mt-2 p-6 w-full md:w-2/3 relative">
            <div className="flex flex-col gap-5">
              <Select>
                <SelectTrigger className="bg-gradient-to-br from-yellow-100 to-orange-500 text-primary font-bold">
                  <SelectValue placeholder="The Pizza Base!!!" />
                </SelectTrigger>
                <SelectContent className="bg-primary">
                  <SelectGroup>
                    <SelectLabel>Pizza Bases</SelectLabel>
                    <div className="p-2">
                      <SelectItem value="TC">Thin Crust</SelectItem>
                      <SelectItem value="NYS">New York Style</SelectItem>
                      <SelectItem value="DD">Deep Dish</SelectItem>
                      <SelectItem value="S">Sourdough</SelectItem>
                      <SelectItem value="N">Neapolitan</SelectItem>
                    </div>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-gradient-to-br from-yellow-100 to-orange-500 text-primary font-bold">
                  <SelectValue placeholder="Which Sauce?" />
                </SelectTrigger>
                <SelectContent className="bg-primary">
                  <SelectGroup>
                    <SelectLabel>Pizza Sauce</SelectLabel>
                    <div className="p-2">
                      <SelectItem value="marinara">Marinara</SelectItem>
                      <SelectItem value="pesto">Pesto</SelectItem>
                      <SelectItem value="alfredo">Alfredo</SelectItem>
                      <SelectItem value="bbq">BBQ</SelectItem>
                      <SelectItem value="GarlicButter">
                        Garlic Butter
                      </SelectItem>
                    </div>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-gradient-to-br from-yellow-100 to-orange-500 text-primary font-bold">
                  <SelectValue placeholder="Add Some Cheese" />
                </SelectTrigger>
                <SelectContent className="bg-primary">
                  <SelectGroup>
                    <SelectLabel>Cheese</SelectLabel>
                    <div className="p-2">
                      <SelectItem value="mozzarella">Mozzarella</SelectItem>
                      <SelectItem value="parmesan">Parmesan</SelectItem>
                      <SelectItem value="cheddar">Cheddar</SelectItem>
                      <SelectItem value="provolone">Provolone</SelectItem>
                      <SelectItem value="ricotta">Ricotta</SelectItem>
                    </div>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default custom;
// Options :
// choose pizza base from 5 bases
// choose any sauce from 5 options
// choose any cheese type
// opt veggies from many options
