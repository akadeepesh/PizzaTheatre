"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  User,
  Home,
  Cookie,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const UserNavigation = () => {
  const { user } = useUser();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <div className="p-0.5 ring-2 dark:ring-stone-100 ring-stone-600 border-transparent focus:border-transparent focus:ring-0 rounded-full">
            <UserButton />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-Anta">
          <DropdownMenuLabel className=" font-Annapura text-base text-primary">
            @{user?.username}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/dashboard/${user?.username}`}>
            <DropdownMenuItem className="cursor-pointer gap-2">
              <span>
                <User size={"1.2rem"} />
              </span>
              <span>My Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/menu`}>
            <DropdownMenuItem className="cursor-pointer gap-2">
              <span>
                <Cookie size={"1.2rem"} />
              </span>
              <span>Menu</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/cart`}>
            <DropdownMenuItem className="cursor-pointer gap-2">
              <span>
                <ShoppingCart size={"1.2rem"} />
              </span>
              <span>Cart</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link href={`/admin-req?user=${user?.username}`}>
            <DropdownMenuItem className="cursor-pointer gap-1">
              <span>
                <ShieldCheck size={"1.2rem"} />
              </span>
              <span>Admin Request</span>
            </DropdownMenuItem>
          </Link>
          <Link href={`/support?user=${user?.username}`}>
            <DropdownMenuItem className="cursor-pointer gap-1">
              <span>
                <AlertCircle size={"1.2rem"} />
              </span>
              <span>Support</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link href={`/`}>
            <DropdownMenuItem className="cursor-pointer gap-1">
              <span>
                <Home size={"1.2rem"} />
              </span>
              <span>Home Page</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer bg-destructive">
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNavigation;
