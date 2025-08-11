"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Fade,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  showCloseButton = true,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth={maxWidth}
    fullWidth={fullWidth}
    TransitionComponent={Fade}
    aria-labelledby="modal-title"
  >
    {(title || showCloseButton) && (
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 1,
        }}
      >
        <Typography id="modal-title">{title}</Typography>
        {showCloseButton && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
    )}
    <DialogContent dividers>{children}</DialogContent>
    <DialogActions>{actions}</DialogActions>
  </Dialog>
);

export default Modal;
