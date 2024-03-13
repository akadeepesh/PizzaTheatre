import React from "react";
import AddNewPizza from "@/components/AddNewPizza";
import Head from "next/head";

const AddPizza = () => {
  return (
    <div>
      <Head>
        <title>Admin | Add New Pizza</title>
      </Head>
      <AddNewPizza />
    </div>
  );
};

export default AddPizza;
