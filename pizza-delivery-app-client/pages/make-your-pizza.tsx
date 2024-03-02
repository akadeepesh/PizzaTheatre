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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

const FormSchema = z.object({
  pizzaBase: z.string(),
});

const Custom = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }
  return (
    <div className="flex flex-wrap justify-center max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <div className="w-full justify-between p-10 flex bg-muted text-foreground">
        <div className="w-full max-w-md flex">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="pizzaBase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Let&apos;s Make Your Pizza{" "}
                      <span className="font-bold">Your&apos;s</span>
                    </FormLabel>
                    <div className="ml-5 flex flex-col gap-3">
                      <div className="">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-primary font-bold">
                              <SelectValue placeholder="The Pizza Base!!!" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gradient-to-br from-rose-300 to-red-500 dark:bg-gradient-to-tl">
                            <SelectGroup>
                              <SelectLabel>
                                Choose Your Favorite Bases
                              </SelectLabel>
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
                        <FormMessage />
                      </div>
                      <div className="">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-primary font-bold">
                              <SelectValue placeholder="Looking Some Sauce?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gradient-to-br from-rose-300 to-red-500 dark:bg-gradient-to-tl">
                            <SelectGroup>
                              <SelectLabel>Pizza Sauce</SelectLabel>
                              <div className="p-2">
                                <SelectItem value="marinara">
                                  Marinara
                                </SelectItem>
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
                        <FormMessage />
                      </div>
                      <div className="">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-primary font-bold">
                              <SelectValue placeholder="Add Some Cheese Here" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gradient-to-br from-rose-300 to-red-500 dark:bg-gradient-to-tl">
                            <SelectGroup>
                              <SelectLabel>Cheese</SelectLabel>
                              <div className="p-2">
                                <SelectItem value="mozzarella">
                                  Mozzarella
                                </SelectItem>
                                <SelectItem value="parmesan">
                                  Parmesan
                                </SelectItem>
                                <SelectItem value="cheddar">Cheddar</SelectItem>
                                <SelectItem value="provolone">
                                  Provolone
                                </SelectItem>
                                <SelectItem value="ricotta">Ricotta</SelectItem>
                              </div>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit">
                <div className="flex gap-2">
                  <div className="rounded-full">
                    <Image
                      src="/CircelPizzaIcon.jpg"
                      alt="Icon"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div className="">Generate Pizza</div>
                </div>
              </Button>
            </form>
          </Form>
        </div>
        <div className="flex w-full max-w-sm">buy menu</div>
      </div>
    </div>
  );
};

export default Custom;
