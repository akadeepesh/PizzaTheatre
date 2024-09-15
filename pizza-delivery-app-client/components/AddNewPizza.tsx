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
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

const FormSchema = z.object({
  name: z.string().min(1, "Pizza name is required"),
  toppings: z.string().min(1, "Toppings are required"),
  smallPrice: z.number().min(0, "Price must be a positive number"),
  mediumPrice: z.number().min(0, "Price must be a positive number"),
  imageUrl: z.string().url().optional(),
  isAvailable: z.boolean(),
});

type FormValues = z.infer<typeof FormSchema>;

const AddNewPizza = () => {
  const addPizza = useMutation(api.pizzas.addPizza);
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      toppings: "",
      smallPrice: 0,
      mediumPrice: 0,
      imageUrl: "",
      isAvailable: true,
    },
  });

  function onSubmit(data: FormValues) {
    addPizza({
      name: data.name,
      toppings: data.toppings.split(",").map((topping) => topping.trim()),
      smallPrice: data.smallPrice,
      mediumPrice: data.mediumPrice,
      imageUrl: data.imageUrl || undefined,
      isAvailable: data.isAvailable,
    })
      .then(() => {
        toast.success("Pizza added successfully");
        form.reset();
      })
      .catch((error: Error) => {
        toast.error("Failed to add pizza: " + error.message);
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
              name="name"
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
                  <FormLabel>Toppings</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cheese, Pepperoni, Mushrooms..."
                      {...field}
                      className="ml-3 placeholder:font-Annapura"
                    />
                  </FormControl>
                  <FormDescription className="ml-4 font-Annapura">
                    Enter toppings separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center flex-row gap-6">
              <FormField
                control={form.control}
                name="smallPrice"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Small Pizza Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="299"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="ml-3 placeholder:font-Annapura"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mediumPrice"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Medium Pizza Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="499"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="ml-3 placeholder:font-Annapura"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/pizza-image.jpg"
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
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Available</FormLabel>
                    <FormDescription>
                      Is this pizza currently available for order?
                    </FormDescription>
                  </div>
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
