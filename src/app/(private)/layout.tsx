import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BoxFlow",
  description: "Gerenciamento de caixas físicas",
};

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
