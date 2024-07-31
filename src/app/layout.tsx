iort type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/header";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import QueryProviders from "@/components/providers/query-provider";
import StoreProvider from "@/components/providers/store-provider";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Doggo",
  description: "description",
};

console.log("habesha")

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative flex min-h-screen flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProviders>
            <AuthProvider>
              <StoreProvider>
                <NextTopLoader />
                <Header />
                <div className="m-6 md:m-12">{children}</div>
                <Toaster />
              </StoreProvider>
            </AuthProvider>
          </QueryProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
