import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        <div className="md:hidden flex flex-row">
          <ModeToggle />
          <Sheet>
            <SheetTrigger>
              <Button variant={"ghost"} size={"sm"}>
                <FontAwesomeIcon icon={faBars} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <UserButton />
                </SheetTitle>
              </SheetHeader>
              {user ? (
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col my-10">
                    <Link href={"/cart"}>
                      <Button
                        variant={"link"}
                        size={"default"}
                        className="gap-2"
                      >
                        <FontAwesomeIcon size="xl" icon={faCartShopping} />{" "}
                        <span className="text-lg">Cart</span>
                      </Button>
                    </Link>
                    <Link href={"/orders"}>
                      <Button
                        variant={"link"}
                        size={"default"}
                        className="gap-2"
                      >
                        <FontAwesomeIcon size="xl" icon={faCartShopping} />{" "}
                        <span className="text-lg">Orders</span>
                      </Button>
                    </Link>
                  </div>
                  <Button className="mb-5">
                    <div className="text-lg">
                      <SignOutButton />
                    </div>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-row">
                  <Button variant={"link"} size={"sm"}>
                    <SignInButton />
                  </Button>
                  <Button
                    className="hidden md:flex"
                    variant={"link"}
                    size={"sm"}
                  >
                    <SignUpButton />
                  </Button>
                  <ModeToggle />
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex flex-row">
          {user ? (
            <div className="flex flex-row justify-center items-center gap-2 md:gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={"/cart"}>
                      <Button variant={"ghost"} size={"sm"}>
                        <FontAwesomeIcon icon={faCartShopping} />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>Cart</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <UserButton />
              <ModeToggle />
            </div>
          ) : (
            <div className="flex flex-row">
              <Button variant={"link"} size={"sm"}>
                <SignInButton />
              </Button>
              <Button className="hidden md:flex" variant={"link"} size={"sm"}>
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
