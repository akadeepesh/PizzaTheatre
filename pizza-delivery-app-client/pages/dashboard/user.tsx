import { UserProfile } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import React from "react";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";

const User = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  return (
    <div className="flex flex-wrap justify-center max-w-screen-lg mx-auto my-20 sm:my-24 md:my-28 lg:my-36">
      <Head>
        <title>{user?.fullName}</title>
      </Head>
      <UserProfile
        appearance={{
          baseTheme: theme === "dark" ? dark : neobrutalism,
        }}
      />
    </div>
  );
};

export default User;
