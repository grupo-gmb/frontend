"use client";

import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
} from "@mui/material";
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

import { menuItems } from "@/components/layout/Sidebar"; // Importando os itens do menu de um arquivo separado

const drawerWidth = 240;

interface BottomBarProps {
  selected?: string;
  onNavigate: (path: string) => void;
}

const BottomNav: React.FC<BottomBarProps> = ({ selected, onNavigate }) => {
  const selectedIndex = menuItems.findIndex((item) => item.text === selected);
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1201,
        display: { xs: "flex", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={selectedIndex === -1 ? 0 : selectedIndex}
        onChange={(_, newValue) => {
          onNavigate(menuItems[newValue].path);
        }}
        sx={{ width: "100%" }}
      >
        {menuItems.map((item) => (
          <BottomNavigationAction
            key={item.text}
            label={item.text}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
