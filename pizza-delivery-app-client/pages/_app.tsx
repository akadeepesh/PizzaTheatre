import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

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
          <Component {...pageProps} />
          <Navbar />
        </ClerkProvider>
        <Toaster />
      </NextThemesProvider>
    </>
  );
}
