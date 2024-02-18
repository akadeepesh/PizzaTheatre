import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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
        </ClerkProvider>
      </NextThemesProvider>
    </>
  );
}
