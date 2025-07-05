"use client";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
} from "@mui/material";
const TopBar: React.FC = (props) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        display: { xs: "flex", md: "block" }, // Esconde no mobile, use Drawer temporário para mobile}
        backgroundColor: "#f0f0f0",
        color: "#111",
        borderBottom: "1px solid #f0f0f0",
        zIndex: (theme) => theme.zIndex.drawer + 1, // Garante que fique acima da sidebar
        height: 64,
        justifyContent: "center",
        flexDirection: { xs: "row" },
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          px: { xs: 1, sm: 3 },
        }}
      >
        {/* Nome da empresa à esquerda */}
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            color: "#111",
            flexGrow: 1,
            letterSpacing: 0.5,

            fontSize: { xs: 20, sm: 20 },
          }}
        >
          OrganizaDoc
        </Typography>

        {/* Sino de notificação */}
        <IconButton
          color="inherit"
          sx={{ mr: 1, display: { xs: "none", sm: "none", md: "flex" } }}
        >
          <Badge badgeContent={2} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Avatar */}
        <Avatar
          alt="Usuário"
          src="https://randomuser.me/api/portraits/men/44.jpg"
          sx={{
            width: 36,
            height: 36,
            display: { xs: "none", sm: "none", md: "flex" },
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
