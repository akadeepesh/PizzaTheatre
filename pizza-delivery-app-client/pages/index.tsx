"use client";
import Feedback from "@/components/Reviews";
import Landing from "@/components/Landing";
import Head from "next/head";
import PizzaGlobeLanding from "@/components/PizzaGlobeLanding";

const HomePage = () => {
  return (
    <div className="">
      <Head>
        <title>Pizza Theatre</title>
      </Head>
      <Landing />
      <Feedback />
      <PizzaGlobeLanding />
    </div>
  );
};

export default HomePage;
