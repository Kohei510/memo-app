import { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import Header from "./Header";

export const metadata: Metadata = {
  title: "memo-app",
  description: "メモアプリ",
  icons: {icon: "/favicon.ico"}
}

export default function RootLayout({ children }: { children: ReactNode}){
  return (
    <html lang="ja">
      <body>
        <Header />
        <div style={{
          marginTop: "50px",
          padding: "20px",
        }}>
          {children}
        </div>
      </body>
    </html>
  )
}