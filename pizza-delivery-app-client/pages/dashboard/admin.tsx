import Head from "next/head";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { CardHoverEffectDemo } from "@/components/CardHover";

const Admin = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-center max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <Head>
        <title>{user?.fullName} | Dashboard</title>
      </Head>
      <div className="">
        <CardHoverEffectDemo></CardHoverEffectDemo>
      </div>
    </div>
  );
};

export default Admin;
