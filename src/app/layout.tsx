'use client'
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import {RecoilRoot} from 'recoil';
import { SocketComponent } from "@/components/SocketComponent";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <SocketComponent>
          <RecoilRoot>
            {children}
            </RecoilRoot>
          </SocketComponent>
          </ThemeProvider></body>
    </html>
  );
}
