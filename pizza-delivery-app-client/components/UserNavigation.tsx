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

import { useRouter } from "next/router";
import {
  ShoppingCart,
  User,
  Home,
  Cookie,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";

const UserNavigation = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <div>
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
              router.push(`/admin?user=${user?.username}`);
            }}
          >
            <span>
              <ShieldCheck size={"1.2rem"} />
            </span>
            <span>Admin Request</span>
          </DropdownMenuItem>
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
    </div>
  );
};

export default UserNavigation;
