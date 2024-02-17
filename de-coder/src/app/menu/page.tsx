import { UserButton } from "@clerk/nextjs";

export default function Menu() {
  return (
    <div className="h-screen">
      <UserButton />
    </div>
  );
}
