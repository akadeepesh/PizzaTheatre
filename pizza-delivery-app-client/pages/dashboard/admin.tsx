"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  pizza_name: z.string(),
  toppings: z.string(),
  price: z.object({
    medium: z.number().int(),
    small: z.number().int(),
  }),
  quantity: z.number().int(),
});
const Admin = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex justify-center max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <div className="bg-secondary rounded-3xl w-5/6 flex justify-center items-center">
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
                      className="ml-3"
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
                      className="ml-3"
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
                        className="ml-3"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter NaN if not available
                    </FormDescription>
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
                        className="ml-3"
                        {...field}
                        required={false}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter NaN if not available
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                      className="ml-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Quantity of the pizza available in the store
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Admin;
