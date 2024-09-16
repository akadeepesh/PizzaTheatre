import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{
            baseTheme: neobrutalism,
          }}
        >
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Component {...pageProps} />
            <Navbar />
          </ConvexProviderWithClerk>
        </ClerkProvider>
        <Toaster />
      </NextThemesProvider>
    </>
  );
}
