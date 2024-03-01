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
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Boxes } from "@/components/ui/background-boxes";

const custom = () => {
  return (
    <div className="flex flex-wrap justify-center max-w-screen-md mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <Head>
        <title>Make Your Custom Pizza</title>
      </Head>
      <div className="bg-secondary w-full text-primary rounded-lg">
        <Boxes />
        <div className="p-6">
          <div className="flex flex-row items-center gap-2">
            {/* <img src="data:image/png;base64,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"></img> */}
            <FontAwesomeIcon size="sm" icon={faPizzaSlice} />
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
        <div className="">Options :</div>
        <div className="">choose pizza base from 5 bases</div>
        <div className="">choose any sauce from 5 options</div>
        <div className="">choose any cheese type</div>
        <div className="">opt veggies from many options</div>
      </div>
    </div>
  );
};

export default custom;
