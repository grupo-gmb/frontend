"use client";
import { usePathname, useRouter } from "next/navigation";
import Sidebar, { menuItems } from "@/components/layout/Sidebar";
import { Box } from "@mui/material";
import TopBar from "./AppBar";
import BottomNav from "./BottomNav";

const drawerWidth = 240;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const selected = menuItems.find((item) =>
    pathname?.startsWith(item.path)
  )?.text;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Barra superior */}
      <TopBar />

      {/* Sidebar (Desktop/tablet) */}
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
          position: "fixed", // fixa a sidebar
          top: 64, // altura da TopBar (ajuste se necessário)
          left: 0,
          height: "calc(100vh - 64px)",
          display: { xs: "none", md: "block" },
          zIndex: 1100,
        }}
      >
        <Sidebar selected={selected} onNavigate={router.push} />
      </Box>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${drawerWidth}px` }, // margem para não ficar atrás da sidebar
          mt: "64px", // altura da TopBar
          p: 1,
          width: "100%",
        }}
      >
        {children}
      </Box>
      {/* Bottom Navigation (mobile/tablet) */}
      <BottomNav selected={selected} onNavigate={router.push} />
    </Box>
  );
};

export default Layout;
