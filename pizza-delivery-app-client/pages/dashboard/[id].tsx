import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useUser();
  const { isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user?.username != id) {
      router.push("/");
    }
  }, [isLoaded, user?.username, id]);

  return (
    <div className="flex flex-col mt-36 ml-32 select-text">
      {isLoaded ? "Welcome to your dashboard" : "Loading..."}
    </div>
  );
}
