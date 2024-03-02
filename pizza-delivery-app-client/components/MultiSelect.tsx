import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

import type { ActionMeta } from "react-select";

interface Hotel {
  value: string;
  label: string;
}

const Hotels: Hotel[] = [
  { value: "cheese", label: "Cheese" },
  { value: "onion", label: "Onion" },
  { value: "capsicum", label: "Capsicum" },
  { value: "red_pepper", label: "Red Pepper" },
  { value: "paneer_tandoori_sauce", label: "Paneer with Spl. Tandoori Sauce" },
];

function MultiSelect() {
  const [selectedOptions, setSelectedOptions] = useState<Hotel[]>([]);

  const handleChange = (
    newValue: readonly Hotel[],
    actionMeta: ActionMeta<Hotel>
  ) => {
    setSelectedOptions(Array.from(newValue));
  };

  return (
    <div className="">
      <Select
        options={Hotels}
        onChange={handleChange}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        value={selectedOptions}
        placeholder="Add Toppings"
        styles={{
          option: (styles, { isFocused }) => {
            return {
              ...styles,
              backgroundColor: isFocused ? "black" : "",
              color: "white",
            };
          },
          menu: (styles) => {
            return {
              ...styles,
              backgroundColor: "#e11d48",
            };
          },
        }}
        className={`rounded border-none`}
        classNames={{
          control: () =>
            "bg-gradient-to-br from-yellow-100 to-orange-500 text-primary font-bold",
          menu: () =>
            "bg-primary border-1 border-primary-foreground text-primary-foreground",
        }}
      />
    </div>
  );
}

export default MultiSelect;
