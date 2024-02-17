import React from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
// import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";

const Navbar = () => {
  // const { user } = useUser();

  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex justify-center">
      <div className="flex md:max-w-screen-xl w-5/6 md:w-full justify-between items-center py-6">
        <h1 className="scroll-m-20 text-3xl md:text-4xl text-primary font-extrabold tracking-tight lg:text-5xl font-serif">
          <a href="/">Pizza Theater</a>
          <Separator className="bg-primary" />
        </h1>
        <div className="flex flex-row">
          {/* {user ? (
            <UserButton />
            <Button variant={"link"} size={"sm"}>
              <SignOutButton />
            </Button>
          ) : ( */}
          <div>
            <Button variant={"link"} size={"sm"}>
              <SignInButton />
            </Button>
            <Button variant={"link"} size={"sm"}>
              <SignUpButton />
            </Button>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
