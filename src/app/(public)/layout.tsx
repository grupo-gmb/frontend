import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BoxFlow",
  description: "A Next.js app using the App Router",
};

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
