import { SignUp } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center h-screen mt-20 sm:mt-24 md:mt-28 lg:mt-36">
      <SignUp
        appearance={{
          baseTheme: theme === "dark" ? dark : neobrutalism,
          variables: { colorPrimary: "red" },
        }}
      />
    </div>
  );
}
