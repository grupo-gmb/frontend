"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";

// Define as opções que o diálogo de confirmação pode receber
interface DialogOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

// Define o tipo da função que o hook irá expor
interface DialogContextType {
  confirm: (options: DialogOptions) => Promise<boolean>;
}

//criar o contexto
const DialogContext = createContext<DialogContextType | null>(null);

// Cria o Provedor
export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<DialogOptions | null>(null);
  const [resolve, setResolve] = useState<(value: boolean) => void>(() => {});
  const [loading, setLoading] = useState(false);

  const confirm = useCallback((options: DialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(options);
      setResolve(() => resolve);
    });
  }, []);

  const handleClose = () => {
    setOptions(null);
    setLoading(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    await resolve(true);
    handleClose();
  };

  const handleCancel = async () => {
    await resolve(false);
    handleClose();
  };

  return (
    <DialogContext.Provider value={{ confirm }}>
      {children}
      <Dialog
        open={options !== null}
        onClose={handleCancel}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="confirm-dialog-title">{options?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {options?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {options?.cancelText || "Cancelar"}
          </Button>
          <Button onClick={handleConfirm} color={"primary"} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              options?.confirmText || "Confirmar"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};

// Cria o hook customizado para usar o contexto
export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useConfirm deve ser usado dentro de um ConfirmProvider");
  }
  return context;
};
