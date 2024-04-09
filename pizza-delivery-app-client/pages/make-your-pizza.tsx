"use client";
import React from "react";
import { NextSeo } from "next-seo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
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
// import MultiSelect, { Hotel } from "@/components/MultiSelect";
import FancyMultiSelect from "@/components/MultiSelectTry";

const FormSchema = z.object({
  pizzaBase: z.string(),
  pizaaSauce: z.string(),
  pizzaCheese: z.string(),
  pizzaToppings: z.string(),
});

const Custom = () => {
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
    <div className="flex flex-wrap justify-center max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <NextSeo
        title={"Make Your Pizza"}
        description="Pizza Theater is an Pizza ordering app, here you can make your own customized pizza."
        canonical="https://pizza-theater.vercel.app/"
        openGraph={{
          url: "https://pizza-theater.vercel.app/",
          title: "Pizza Theater",
          description:
            "Pizza Theater is an Pizza ordering app that allows you to order your favorite pizza from the comfort of your home.",
          siteName: "Pizza Theater",
        }}
      />
      <div className="w-full justify-between p-10 flex bg-muted text-foreground rounded-badge">
        <div className="w-full flex">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="pizzaBase"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-8">
                    <FormLabel className="text-xl">
                      <span className="font-Anta">
                        Let&apos;s Make Your Pizza{" "}
                      </span>
                      <span className="font-bold text-primary font-ProtestRevolution">
                        Your&apos;s
                      </span>
                    </FormLabel>
                    <div className="mx-5 flex flex-col">
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
                            <SelectLabel>Choose Your Favorite Base</SelectLabel>
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pizaaSauce"
                render={({ field }) => (
                  <FormItem className="mx-5">
                    <Select
                    // onValueChange={field.onChange}
                    // defaultValue={field.value}
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
                            <SelectItem value="marinara">Marinara</SelectItem>
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pizzaCheese"
                render={({ field }) => (
                  <FormItem className="mx-5">
                    <Select
                    // onValueChange={field.onChange}
                    // defaultValue={field.value}
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
                            <SelectItem value="parmesan">Parmesan</SelectItem>
                            <SelectItem value="cheddar">Cheddar</SelectItem>
                            <SelectItem value="provolone">Provolone</SelectItem>
                            <SelectItem value="ricotta">Ricotta</SelectItem>
                          </div>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="mx-5"> */}
              {/* <MultiSelect
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                /> */}
              {/* <FancyMultiSelect /> */}
              {/* </div> */}
              <Button size={"lg"} type="submit" className="group">
                <div className="flex gap-1 items-center">
                  <div className="text-lg font-Anta">Generate Pizza</div>
                  <Image
                    src="/images/CircelPizzaIcon.png"
                    alt="Icon"
                    width={30}
                    height={30}
                    className="group-hover:animate-spin transition duration-300 ease-in-out"
                  />
                </div>
              </Button>
            </form>
          </Form>
        </div>
        {/* <div className="flex w-full max-w-sm">buy menu</div> */}
      </div>
    </div>
  );
};

export default Custom;
