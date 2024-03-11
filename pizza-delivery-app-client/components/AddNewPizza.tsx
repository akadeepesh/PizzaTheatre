"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { AlertCircle } from "lucide-react";

const stringToNumber = z.string().transform((val) => Number(val));

const FormSchema = z.object({
  pizza_name: z.string(),
  toppings: z.string(),
  price: z.object({
    medium: stringToNumber,
    small: stringToNumber,
  }),
  quantity: stringToNumber,
});

const AddNewPizza = () => {
  const addPizza = useMutation(api.pizzas.pizza);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addPizza({
      name: data.pizza_name,
      toppings: data.toppings,
      price: data.price,
      quantity: data.quantity,
    }).then(() => {
      form.reset();
      toast.success("Pizza added successfully");
    });
  }

  return (
    <div className="flex justify-center max-w-screen-lg mx-auto mt-36 sm:mt-24 md:mt-28 lg:mt-36">
      <div className="bg-secondary rounded-3xl w-5/6 flex justify-center items-center font-Anta">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-5/6 space-y-6 py-10"
          >
            <FormField
              control={form.control}
              name="pizza_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pizza Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pepperoni Pizza..."
                      className="ml-3 placeholder:font-Annapura"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toppings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mention toppings</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cheese, Capsicum, Tomatoes..."
                      {...field}
                      className="ml-3 placeholder:font-Annapura"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center flex-row gap-6">
              <FormField
                control={form.control}
                name="price.small"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Small Pizza Price</FormLabel>
                    <FormControl>
                      <Input
                        step={1}
                        type="number"
                        placeholder="299"
                        {...field}
                        required={false}
                        className="ml-3 placeholder:font-Annapura"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price.medium"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Medium Pizza Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={1}
                        placeholder="499"
                        className="ml-3 placeholder:font-Annapura"
                        {...field}
                        required={false}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* {form.formState.errors.price && (
              <FormDescription className="flex text-primary gap-1 font-Annapura ml-5 items-center justify-center">
                <AlertCircle size={18} />
                <div className="text-primary">
                  {form.formState.errors.price.message}
                </div>
              </FormDescription>
            )} */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={1}
                      placeholder="25"
                      className="ml-3 placeholder:font-Annapura"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="ml-4 font-Annapura">
                    Quantity of the pizza available in the store
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Add Pizza</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddNewPizza;
