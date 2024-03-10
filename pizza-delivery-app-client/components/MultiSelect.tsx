"use client";
import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

import type { ActionMeta } from "react-select";

export interface Hotel {
  value: string;
  label: string;
}

interface MultiSelectProps {
  selectedOptions: Hotel[];
  setSelectedOptions: (options: Hotel[]) => void;
}

const Hotels: Hotel[] = [
  { value: "cheese", label: "Cheese" },
  { value: "onion", label: "Onion" },
  { value: "capsicum", label: "Capsicum" },
  { value: "red_pepper", label: "Red Pepper" },
  { value: "paneer_tandoori_sauce", label: "Paneer with Spl. Tandoori Sauce" },
  { value: "jalapeno", label: "Jalapeno" },
  { value: "golden_corn", label: "Golden Corn" },
  { value: "mushroom", label: "Mushroom" },
  { value: "tomatoes", label: "Tomatoes" },
  { value: "spl_colli_garlic_sauce", label: "Special Colli Garlic Sauce" },
  { value: "sweet_corn", label: "Sweet Corn" },
  { value: "spl_makhni_sauce", label: "Spl. Makhni Sauce" },
  {
    value: "red_pepper_with_spl_tandoori_sauce",
    label: "Red Pepper with Spl Tandoori Sauce",
  },
  { value: "paneer", label: "Paneer" },
  { value: "black_olive_cheese", label: "Olive with Extra Cheese" },
  { value: "corn", label: "Corn" },
  { value: "baby_corn", label: "Baby Corn" },
  { value: "bbq_chicken", label: "BBQ Chicken" },
  { value: "chicken_sausages", label: "Chicken Sausages" },
  { value: "chicken_tikka", label: "Chicken Tikka" },
  { value: "spicy_chicken", label: "Spicy Chicken" },
  { value: "chicken_rashers", label: "Chicken Rashers" },
  { value: "double_bbq", label: "Double BBQ" },
];

function MultiSelect({
  selectedOptions,
  setSelectedOptions,
}: MultiSelectProps) {
  const handleChange = (
    newValue: readonly Hotel[],
    actionMeta: ActionMeta<Hotel>
  ) => {
    setSelectedOptions(Array.from(newValue));
  };
  return (
    <div className="z-20">
      <Select
        options={Hotels}
        onChange={handleChange}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        value={selectedOptions}
        placeholder="Add Toppings"
        styles={{
          option: (styles) => {
            return {
              ...styles,
              color: "black",
              borderRadius: "0.5rem",
              width: "95%",
              marginLeft: "0.5rem",
            };
          },
          menu: (styles) => {
            return {
              ...styles,
              backgroundColor: "#e11d48",
              border: "1px solid black dark:border-white",
            };
          },
          placeholder: (styles) => {
            return {
              ...styles,
              color: "white dark:black",
              fontSize: "14px",
            };
          },
          control: (styles) => {
            return {
              ...styles,
              backgroundColor: "#e11d48",
              fontWeight: "700",
              border: "None",
            };
          },
        }}
      />
    </div>
  );
}

export default MultiSelect;
