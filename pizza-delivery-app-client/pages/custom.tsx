import React from "react";
import Head from "next/head";

const custom = () => {
  return (
    <div className="flex flex-wrap justify-center max-w-screen-xl mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <Head>
        <title>Make Your Custom Pizza</title>
      </Head>
      <div className="bg-white w-full">Custom</div>
    </div>
  );
};

export default custom;
