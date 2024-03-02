"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  pizzaBase: z.string(),
});

const Custom = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pizzaBase: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex flex-wrap justify-center max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <div className="w-full bg-muted text-foreground">
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="pizzaBase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pizza Base</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="bg-gradient-to-br from-yellow-100 to-orange-500 text-primary font-bold">
                          <SelectValue placeholder="The Pizza Base!!!" />
                        </SelectTrigger>

                        <SelectContent className="bg-primary">
                          <SelectGroup>
                            <SelectLabel>Pizza Bases</SelectLabel>
                            <div className="p-2">
                              <SelectItem value="TC">Thin Crust</SelectItem>
                              <SelectItem value="NYS">
                                New York Style
                              </SelectItem>
                              <SelectItem value="DD">Deep Dish</SelectItem>
                              <SelectItem value="S">Sourdough</SelectItem>
                              <SelectItem value="N">Neapolitan</SelectItem>
                            </div>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormDescription>
                      Choose your favorite pizza base.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Custom;
