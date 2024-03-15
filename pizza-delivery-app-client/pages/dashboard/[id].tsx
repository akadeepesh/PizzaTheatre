import { useRouter } from "next/router";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard() {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useUser();

  if (user?.firstName?.toLowerCase() != id) {
    // router.push("/");
  }

  return (
    <div className="flex flex-col mt-36 ml-32 select-text">
      Welcome to your dashboard, {user?.firstName?.toLowerCase()}
      {typeof user?.firstName?.toLowerCase()}
      <div className="">
        id is {id}
        {typeof id}
      </div>
    </div>
  );
}
