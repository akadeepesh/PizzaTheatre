import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Load = () => {
  return <div>Loading...</div>;
};

export const Loaded = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-center gap-2">
      <Avatar>
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>
          {(user?.firstName ?? "")[0] + (user?.lastName ?? "")[0]}
        </AvatarFallback>
      </Avatar>
      Welcome to your dashboard
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
    <div className="flex justify-center max-w-screen-lg mx-auto mt-20 sm:mt-24 md:mt-28 lg:mt-36">
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
