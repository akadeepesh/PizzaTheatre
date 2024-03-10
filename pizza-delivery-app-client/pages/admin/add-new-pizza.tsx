import React from "react";
import AddNewPizza from "@/components/AddNewPizza";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";

const AddPizza = () => {
  const user = useUser();
  return (
    <div>
      <Head>
        <title>{user.user?.firstName} | Add New Pizza</title>
      </Head>
      <AddNewPizza />
    </div>
  );
};

export default AddPizza;
