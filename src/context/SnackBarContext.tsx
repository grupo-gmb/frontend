"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

//define a estrutura dos dados da notificação
interface SnackbarOptions {
  message: string;
  severity?: AlertColor;
  duration?: number;
}

//define a função que o hook irá expor
interface SnackbarContextType {
  showSnackbar: (options: SnackbarOptions) => void;
}

//cria o contexto com o valor inicial nulo
const SnackbarContext = createContext<SnackbarContextType | null>(null);

//cria o provedor que irá envolver
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [duration, setDuration] = useState(4000);

  const showSnackbar = ({
    message,
    severity = "info",
    duration = 5000,
  }: SnackbarOptions) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar deve ser usado dentro de um SnackbarProvider");
  }
  return context;
};
