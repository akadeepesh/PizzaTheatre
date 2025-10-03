"use client";
import Feedback from "@/components/Reviews";
import Landing from "@/components/Landing";
import Head from "next/head";

const HomePage = () => {
  return (
    <div className="">
      <Head>
        <title>Pizza Theatre</title>
      </Head>
      <Landing />
      <Feedback />
    </div>
  );
};

export default HomePage;