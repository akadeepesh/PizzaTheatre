import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { UserButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/router";
import {
  ShoppingCart,
  User,
  Home,
  Menu,
  Cookie,
  AlertCircle,
} from "lucide-react";

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    checkScroll();
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
          className={`cursor-pointer scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl font-ProtestRevolution ${
            isScrolled ? "dark:text-secondary text-primary" : "text-primary"
          }`}
          onClick={() => {
            router.push(`/`);
          }}
        >
          Pizza Theatre
          <Separator
            className={`${
              isScrolled ? "dark:bg-secondary bg-primary" : "bg-primary"
            }`}
          />
        </h1>
        <div className="md:hidden flex flex-row gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="p-0.5 ring-2 dark:ring-stone-100 ring-stone-600 border-transparent focus:border-transparent focus:ring-0 rounded-full">
                  <UserButton />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>@{user?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer gap-2"
                  onClick={() => {
                    router.push(`/profile/${user?.username}`);
                  }}
                >
                  <span>
                    <User size={"1.2rem"} />
                  </span>
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer gap-2"
                  onClick={() => {
                    router.push(`/menu`);
                  }}
                >
                  <span>
                    <Cookie size={"1.2rem"} />
                  </span>
                  <span>Menu</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer gap-2"
                  onClick={() => {
                    router.push(`/cart`);
                  }}
                >
                  <span>
                    <ShoppingCart size={"1.2rem"} />
                  </span>
                  <span>Cart</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer gap-1"
                  onClick={() => {
                    router.push(`/support?user=${user?.username}`);
                  }}
                >
                  <span>
                    <AlertCircle size={"1.2rem"} />
                  </span>
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer gap-1"
                  onClick={() => {
                    router.push(`/`);
                  }}
                >
                  <span>
                    <Home size={"1.2rem"} />
                  </span>
                  <span>Home Page</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer bg-destructive">
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex flex-row">
              <Button
                variant={"link"}
                size={"sm"}
                className={`${
                  isScrolled
                    ? "dark:text-secondary text-primary"
                    : "text-primary"
                }`}
              >
                <SignInButton />
              </Button>
            </div>
          )}
          <ModeToggle
            className={`${
              isScrolled ? "dark:text-secondary text-primary" : "text-primary"
            }`}
          />
          <Drawer>
            <DrawerTrigger>
              <Menu
                className={`${
                  isScrolled
                    ? "dark:text-secondary text-primary"
                    : "text-primary"
                }`}
              />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="font-Annapura">
                  Navigation menu? Here it is!
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col py-2 font-Anta">
                <Button
                  variant={"link"}
                  className="flex flex-row gap-2 items-center"
                  size={"sm"}
                  onClick={() => router.push("/")}
                >
                  <Home />
                  <div className="flex">Home</div>
                </Button>
                <Button
                  variant={"link"}
                  size={"sm"}
                  className="flex flex-row gap-4 items-center"
                  onClick={() => router.push("/cart")}
                >
                  <ShoppingCart />
                  <div className="flex">Cart</div>
                </Button>
                <Button
                  variant={"link"}
                  size={"sm"}
                  className="flex gap-2 items-center"
                  onClick={() => router.push("/cart")}
                >
                  <User /> <div className="flex">Profile</div>
                </Button>
              </div>
              <Separator />
              <DrawerFooter>
                <div className="flex justify-between w-full">
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
                className="text-sm font-Anta dark:text-foreground transition-none"
                onClick={() => {
                  router.push(`/make-your-pizza`);
                }}
              >
                Create Your Pizza
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className="dark:text-foreground text-primary"
                      onClick={() => router.push(`/dashboard/user`)}
                    >
                      <User />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-sm font-Anta">User Profile</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className="text-primary dark:text-primary-foreground"
                      onClick={() => router.push("/cart")}
                    >
                      <ShoppingCart />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Cart</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="p-0.5 ring-2 dark:ring-stone-100 ring-stone-600 border-transparent focus:border-transparent focus:ring-0 rounded-full">
                    <UserButton />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>@{user?.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() => {
                      router.push(`/profile/${user?.username}`);
                    }}
                  >
                    <span>
                      <User size={"1.2rem"} />
                    </span>
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() => {
                      router.push(`/menu`);
                    }}
                  >
                    <span>
                      <Cookie size={"1.2rem"} />
                    </span>
                    <span>Menu</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() => {
                      router.push(`/cart`);
                    }}
                  >
                    <span>
                      <ShoppingCart size={"1.2rem"} />
                    </span>
                    <span>Cart</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer gap-1"
                    onClick={() => {
                      router.push(`/support?user=${user?.username}`);
                    }}
                  >
                    <span>
                      <AlertCircle size={"1.2rem"} />
                    </span>
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer gap-1"
                    onClick={() => {
                      router.push(`/`);
                    }}
                  >
                    <span>
                      <Home size={"1.2rem"} />
                    </span>
                    <span>Home Page</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer bg-destructive">
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ModeToggle
                className={`text-primary ${
                  isScrolled ? "dark:text-foreground" : "dark:text-foreground"
                }`}
              />
            </div>
          ) : (
            <div className="flex flex-row">
              <Button
                variant={"link"}
                size={"sm"}
                className={`${
                  isScrolled
                    ? "dark:text-secondary text-primary"
                    : "text-primary"
                }`}
              >
                <SignInButton />
              </Button>
              <Button
                className={`hidden md:flex ${
                  isScrolled
                    ? "dark:text-secondary text-primary"
                    : "text-primary"
                }`}
                variant={"link"}
                size={"sm"}
              >
                <SignUpButton />
              </Button>
              <ModeToggle
                className={`${
                  isScrolled
                    ? "dark:text-secondary text-primary"
                    : "text-primary"
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
