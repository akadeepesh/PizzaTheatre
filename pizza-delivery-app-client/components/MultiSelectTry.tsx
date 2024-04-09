"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Pizza = Record<"value" | "label", string>;

const Pizzas = [
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
] satisfies Pizza[];

const MAX_ITEMS = 6;

export default function FancyMultiSelect() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Pizza[]>([Pizzas[4]]);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedValues, setSelectedValues] = React.useState<string[]>([
    Pizzas[4].label,
  ]);
  const [maxItemsReached, setMaxItemsReached] = React.useState(false);

  const handleUnselect = React.useCallback((framework: Pizza) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
    setSelectedValues((prev) =>
      prev.filter((value) => value !== framework.label)
    );
    setMaxItemsReached(false);
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
            setSelectedValues((prev) => {
              const newSelectedValues = [...prev];
              newSelectedValues.pop();
              return newSelectedValues;
            });
            setMaxItemsReached(false);
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = Pizzas.filter(
    (framework) => !selected.includes(framework)
  );

  const handleSelect = (framework: Pizza) => {
    if (selected.length < MAX_ITEMS) {
      setSelected((prev) => [...prev, framework]);
      setSelectedValues((prev) => [...prev, framework.label]);
    } else {
      setMaxItemsReached(true);
    }
  };

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      {maxItemsReached && (
        <div className="text-primary mb-1 text-xs">
          Max {MAX_ITEMS} cheese can be added
        </div>
      )}
      <div className="group bg-primary border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select toppings..."
            className="bg-transparent outline-none placeholder:text-foreground placeholder:font-bold flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-gradient-to-br from-rose-300 to-red-500 dark:bg-gradient-to-tl text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup
              className="h-full overflow-auto"
              style={{ columnCount: "auto", columnWidth: "200px" }}
            >
              {selectables.map((framework, index) => {
                return (
                  <CommandItem
                    key={index}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => handleSelect(framework)}
                    className="cursor-pointer"
                  >
                    {framework.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>

      {/* <div>Selected Values: {selectedValues.join(", ")}</div> */}
    </Command>
  );
}
