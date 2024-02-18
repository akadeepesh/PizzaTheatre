import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();

  const [isScrolled, setIsScrolled] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-10 flex justify-center transition-all duration-300 ${
        isScrolled ? "dark:bg-navbar bg-navbarLight" : ""
      }`}
    >
      <div className="flex md:max-w-screen-xl w-5/6 md:w-full justify-between items-center py-6">
        <h1
          className={`scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl font-ProtestRevolution ${
            isScrolled ? "dark:text-secondary text-primary" : "text-primary"
          }`}
        >
          <Link href="/">Pizza Theater</Link>
          <Separator
            className={`${
              isScrolled ? "dark:bg-secondary bg-primary" : "bg-primary"
            }`}
          />
        </h1>
        <div className="flex flex-row">
          {user ? (
            <div className="flex flex-row gap-2 md:gap-3">
              <UserButton />
              <ModeToggle />
            </div>
          ) : (
            <div className="flex flex-row">
              <Button variant={"link"} size={"sm"}>
                <SignInButton />
              </Button>
              <Button variant={"link"} size={"sm"}>
                <SignUpButton />
              </Button>
              <ModeToggle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
