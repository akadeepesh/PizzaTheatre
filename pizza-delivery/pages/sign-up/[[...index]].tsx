import { SignUp } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp
        appearance={{
          baseTheme: neobrutalism,
          variables: { colorPrimary: "red" },
        }}
      />
    </div>
  );
}
