import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BoxFlow",
  description: "A Next.js app using the App Router",
};

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <h1>super_admin@gmb.com</h1>
      <h1>senha1234</h1>
      <h1>115df89759784557</h1>
      {children}
    </div>
  );
}
