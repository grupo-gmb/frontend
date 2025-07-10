"use client";

import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  MoveToInbox as MoveToInboxIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

export const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Clientes", icon: <PeopleIcon />, path: "/clients" },
  { text: "Caixas", icon: <InventoryIcon />, path: "/boxes" },
  { text: "Movimentações", icon: <MoveToInboxIcon />, path: "/movements" },
  { text: "Relatórios", icon: <AssessmentIcon />, path: "/reports" },
  { text: "Configurações", icon: <SettingsIcon />, path: "/settings" },
];

interface SideBarProps {
  selected?: string;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ selected, onNavigate }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "background.default",
          borderRight: "none",
        },
        display: { xs: "none", md: "block" }, // Esconde no mobile, use Drawer temporário para mobile
      }}
      open
    >
      <Box
        sx={{ px: 3, py: 4, display: "flex", alignItems: "center", gap: 1 }}
      ></Box>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selected === item.text}
              onClick={() => onNavigate?.(item.path)}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "background.default",
                  "& .MuiListItemIcon-root": { color: "background.default" },
                  "&:hover": {
                    backgroundColor: "primary.light", // Nova cor de hover
                    color: "background.default", // Cor do texto no hover
                    "& .MuiListItemIcon-root": { color: "background.default" }, // Cor do ícone no hover
                  },
                },
                "&:hover": {
                  backgroundColor: "secondary.dark", // Nova cor de hover
                  color: "background.default", // Cor do texto no hover
                  "& .MuiListItemIcon-root": { color: "background.default" }, // Cor do ícone no hover
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
