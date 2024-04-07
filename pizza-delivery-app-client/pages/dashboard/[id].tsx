import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useRouter } from "next/router";
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
export const Load = () => {
  return <div>Loading...</div>;
};

export const Loaded = () => {
  const { user } = useUser();
  return (
    <div className="flex gap-2 w-full justify-between">
      <div className="flex w-full flex-col gap-10">
        <Card className="h-fit w-full bg-secondary hover:bg-primary group cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-4">
              <Pizza className="size-10 group-hover:size-12 transition-all duration-300" />
              <div className="flex flex-col gap-2">
                <CardTitle className="font-Anta">Order History</CardTitle>
                <CardDescription className="font-Annapura group-hover:text-foreground">
                  Get your order history and find your favorite pizza back
                </CardDescription>
              </div>
            </div>
            <div className="flex w-fit mr-5 group-hover:mr-0 transition-all duration-300">
              <MoveRight />
            </div>
          </CardHeader>
        </Card>
        <Card className="h-fit w-full bg-secondary hover:bg-primary group cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-4">
              <ShoppingBasket className="size-10 group-hover:size-12 transition-all duration-300" />
              <div className="flex flex-col gap-2">
                <CardTitle className="font-Anta">Your Cart</CardTitle>
                <CardDescription className="font-Annapura group-hover:text-foreground">
                  Find your cart and manage your orders
                </CardDescription>
              </div>
            </div>
            <div className="flex w-fit mr-5 group-hover:mr-0 transition-all duration-300">
              <MoveRight />
            </div>
          </CardHeader>
        </Card>
        <Link href="/dashboard/edit">
          <Card className="h-fit w-full bg-secondary hover:bg-primary group cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center gap-4">
                <ShieldCheck className="size-10 group-hover:size-12 transition-all duration-300" />
                <div className="flex flex-col gap-2">
                  <CardTitle className="font-Anta">
                    Account & Security
                  </CardTitle>
                  <CardDescription className="font-Annapura group-hover:text-foreground">
                    Edit your profile and manage your devices
                  </CardDescription>
                </div>
              </div>
              <div className="flex w-fit mr-5 group-hover:mr-0 transition-all duration-300">
                <MoveRight />
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href={`/support?user=${user?.username}`}>
          <Card className="h-fit w-full bg-secondary hover:bg-primary group cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-center gap-4">
                <BadgeCheck className="size-10 group-hover:size-12 transition-all duration-300" />
                <div className="flex flex-col gap-2">
                  <CardTitle className="font-Anta">User Support</CardTitle>
                  <CardDescription className="font-Annapura group-hover:text-foreground">
                    Get help, support and contact the support team.
                  </CardDescription>
                </div>
              </div>
              <div className="flex w-fit mr-5 group-hover:mr-0 transition-all duration-300">
                <MoveRight />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <div className="flex">
        <Avatar className="h-fit max-w-fit w-40 m-10">
          <AvatarImage src={user?.imageUrl} className="object-cover" />
          <AvatarFallback>
            {(user?.firstName ?? "N/")[0] + (user?.lastName ?? "A")[0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user?.username !== id) {
      router.push("/");
    }
  }, [isLoaded, user?.username, id]);

  return (
    <div className="flex max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <NextSeo
        title={isLoaded ? `Dashboard | ${user?.fullName}` : "Loading..."}
        description="Pizza Theater is an Pizza ordering app that allows you to order your favorite pizza from the comfort of your home."
        canonical="https://pizza-theater.vercel.app/"
        openGraph={{
          url: "https://pizza-theater.vercel.app/",
          title: "Pizza Theater",
          description:
            "Pizza Theater is an Pizza ordering app that allows you to order your favorite pizza from the comfort of your home.",
          siteName: "Pizza Theater",
        }}
      />
      {isLoaded ? <Loaded /> : <Load />}
    </div>
  );
};

export default Dashboard;
