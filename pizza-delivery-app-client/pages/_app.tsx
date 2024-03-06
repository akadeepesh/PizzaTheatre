import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { ConvexProvider, ConvexReactClient } from "convex/react";
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
          appearance={{
            baseTheme: neobrutalism,
          }}
        >
          <ConvexProvider client={convex}>
            <Component {...pageProps} />
            <Navbar />
          </ConvexProvider>
        </ClerkProvider>
        <Toaster />
      </NextThemesProvider>
    </>
  );
}
