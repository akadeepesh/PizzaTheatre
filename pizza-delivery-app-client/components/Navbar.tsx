import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBars,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
        <div className="md:hidden flex flex-row gap-2">
          {user ? (
            <UserButton />
          ) : (
            <div className="flex flex-row">
              <Button variant={"link"} size={"sm"}>
                <SignInButton />
              </Button>
              <Button className="hidden md:flex" variant={"link"} size={"sm"}>
                <SignUpButton />
              </Button>
              {/* <ModeToggle /> */}
            </div>
          )}
          <Drawer>
            <DrawerTrigger>
              <Button variant={"ghost"} size={"sm"}>
                <FontAwesomeIcon icon={faBars} size="xl" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="font-Annapura">
                  Navigation menu? Here it is!
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col py-2 font-Anta">
                <Button variant={"link"} size={"sm"}>
                  <Link href={"/"}>
                    <FontAwesomeIcon size="sm" icon={faHouse} /> Home
                  </Link>
                </Button>
                <Button variant={"link"} size={"sm"}>
                  <Link href={"/cart"}>
                    <FontAwesomeIcon size="sm" icon={faCartShopping} /> Cart
                  </Link>
                </Button>
                <Button variant={"link"} size={"sm"}>
                  <Link href={"/dashboard/user"}>
                    <FontAwesomeIcon size="sm" icon={faUser} /> Profile
                  </Link>
                </Button>
              </div>
              <Separator />
              <DrawerFooter>
                <div className="flex justify-between z*w-full">
                  <Button>{user ? <SignOutButton /> : <SignUpButton />}</Button>
                  <DrawerClose>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="hidden md:flex flex-row">
          {user ? (
            <div className="flex flex-row justify-center items-center gap-2 md:gap-3">
              <Button
                variant={"link"}
                size={"sm"}
                className="text-sm font-Anta text-secondary-foreground"
              >
                <Link href={"/make-your-pizza"}>Create Your Pizza</Link>
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={"/dashboard/user"}>
                      <Button variant={"ghost"} size={"sm"}>
                        <FontAwesomeIcon size="sm" icon={faUser} />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-sm font-Anta text-secondary-foreground">
                      User Profile
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                    <span>Cart</span>
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
