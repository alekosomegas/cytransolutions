import "./globals.css";
import { Inter } from "next/font/google";
import AuthContext from "./AuthContext";
import React from "react";
import Wrapper from "./components/Wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cytransolutions",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <AuthContext>
      <head>
        <meta
          name="viewport"
          content="width=device-width,height=device-height initial-scale=1"
        />
      </head>
      <html lang="en">
        <Wrapper>{children}</Wrapper>
      </html>
    </AuthContext>
  );
}
