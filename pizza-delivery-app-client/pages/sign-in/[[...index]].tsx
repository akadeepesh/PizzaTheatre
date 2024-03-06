import { SignIn } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        appearance={{
          baseTheme: theme === "dark" ? dark : neobrutalism,
          variables: { colorPrimary: "red" },
        }}
      />
    </div>
  );
}
