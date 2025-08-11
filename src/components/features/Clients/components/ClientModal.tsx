import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Switch,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";

import { Error, CheckCircle } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import ClientForm from "./ClientForm";
import { ClientData } from "@/types/client";

interface ClientModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  modalTitle: string;
  onSave: (data: ClientData) => void;
  isUpdate?: boolean;
  initialData?: Partial<ClientData>;
  children?: React.ReactNode;
}

export default function ClientModal({
  modalOpen,
  setModalOpen,
  modalTitle,
  onSave,
  isUpdate,
  initialData,
}: ClientModalProps) {
  const handleClose = () => {
    console.log("teste");
    setModalOpen(false);
  };

  return (
    <Modal open={modalOpen} onClose={handleClose} title={modalTitle}>
      <ClientForm
        initialData={initialData}
        onSubmit={(data) => {
          onSave(data);
          handleClose();
        }}
        isUpdate={isUpdate}
      />
    </Modal>
  );
}
