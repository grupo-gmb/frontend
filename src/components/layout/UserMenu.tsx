"use client";
import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Typography,
  Icon,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data: session } = useSession();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();

    signOut({ callbackUrl: "/" }); //Redireciona para a home após o logout
  };

  return (
    <>
      <IconButton onClick={handleMenu} size="small" sx={{ ml: 2 }}>
        <Avatar
          alt={session?.user?.name || "Usuário"}
          src={
            session?.user?.image ||
            "https://randomuser.me/api/portraits/men/44.jpg"
          }
          sx={{ width: 36, height: 36 }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: { minWidth: 180 },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disabled>
          <Typography variant="body2" color="text.secondary">
            {session?.user?.name || "Usuário"}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
