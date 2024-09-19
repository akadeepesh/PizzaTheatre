"use client";

import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MoveRight,
  Pizza,
  ShieldCheck,
  BadgeCheck,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Load = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon: Icon,
  title,
  description,
  href,
}) => (
  <Link href={href}>
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Card className="h-full bg-card hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-300 cursor-pointer group">
        <CardHeader className="flex flex-row items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-full group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <CardDescription className="text-sm mt-1 group-hover:text-foreground/80 transition-colors duration-300">
                {description}
              </CardDescription>
            </div>
          </div>
          <MoveRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
        </CardHeader>
      </Card>
    </motion.div>
  </Link>
);

export const Loaded = () => {
  const { user } = useUser();

  const dashboardItems = [
    {
      icon: Pizza,
      title: "Order History",
      description: "View your past orders and reorder favorites",
      href: "/order-history",
    },
    {
      icon: ShoppingBasket,
      title: "Your Cart",
      description: "Manage your current order",
      href: "/cart",
    },
    {
      icon: ShieldCheck,
      title: "Account & Security",
      description: "Update your profile and security settings",
      href: "/dashboard/edit",
    },
    {
      icon: BadgeCheck,
      title: "User Support",
      description: "Get help and contact our support team",
      href: `/support?user=${user?.username}`,
    },
  ];

  return (
    <div className="flex mt-20 flex-col lg:flex-row gap-8 w-full">
      <div className="lg:w-3/4 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.firstName}!</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {dashboardItems.map((item, index) => (
            <DashboardCard key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="lg:w-1/4">
        <div className="sticky top-24">
          <Card className="overflow-hidden">
            <div className="aspect-square relative">
              <Avatar className="h-full w-full">
                <AvatarImage src={user?.imageUrl} className="object-cover" />
                <AvatarFallback className="text-4xl">
                  {(user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "")}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardHeader>
              <CardTitle>{user?.fullName}</CardTitle>
              <CardDescription>
                {user?.primaryEmailAddress?.emailAddress}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <NextSeo
        title={isLoaded ? `Dashboard | ${user?.fullName}` : "Loading..."}
        description="Manage your Pizza Theater account, view order history, and get support."
        canonical="https://pizza-theater.vercel.app/dashboard"
        openGraph={{
          url: "https://pizza-theater.vercel.app/dashboard",
          title: "Pizza Theater Dashboard",
          description:
            "Manage your Pizza Theater account, view order history, and get support.",
          siteName: "Pizza Theater",
        }}
      />
      {isLoaded ? <Loaded /> : <Load />}
    </div>
  );
}
