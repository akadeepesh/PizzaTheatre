import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

import type { ActionMeta } from "react-select";

interface Hotel {
  value: number;
  label: string;
}

const Hotels: Hotel[] = [
  { value: 1, label: "Coral Beach Maldives" },
  { value: 2, label: "Ilaa Beach Maldives" },
  { value: 3, label: "Finolhu" },
  { value: 4, label: "Arena" },
  { value: 5, label: "Kaani Beach Hotel" },
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
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundImage:
              "linear-gradient(to bottom right, #FDE68A, #F97316)",
          }),
          //   option: (styles, { isFocused, isSelected }) => {
          //     return {
          //       ...styles,
          //       backgroundColor: isFocused ? "#FDE68A" : "white",
          //       color: isSelected ? "black" : "black",
          //     };
          //   },
          menu: (styles) => {
            return {
              ...styles,
              backgroundColor: "red",
            };
          },
        }}
        className="z-20 rounded border-none"
      />
    </div>
  );
}

export default MultiSelect;
