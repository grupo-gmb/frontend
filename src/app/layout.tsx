import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Minha Aplicação",
  description: "Descrição da aplicação",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>{/* Tags adicionais podem ir aqui se necessário */}</head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
