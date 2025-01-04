import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Created by Ritik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        <nav className="hidden md:flex items-center justify-between rounded-full border-[1px] w-1/3 mx-auto border-slate-900 mt-2 p-2">
          <h1 className="text-2xl font-bold">Blog App</h1>
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-slate-200 px-4 py-2">
              Sign In
            </button>
            <button className="rounded-full bg-slate-200 px-4 py-2">
              Sign Up
            </button>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
