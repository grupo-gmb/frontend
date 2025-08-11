import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export interface ActionFormData {
  notes?: string;
  module?: string;
  line?: string;
  column?: string;
  slot?: string;
}

interface ActionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: ActionFormData) => void;
  actionType: string;
  isLoading?: boolean;
}

const getActionConfig = (actionType: string) => {
  switch (actionType) {
    case "allocate":
      return {
        title: "Alocar Caixa",
        description: "Reservar um local na prateleira para a caixa",
        requiresLocation: true,
      };
    case "transfer":
      return {
        title: "Transferir Caixa",
        description: "Transferir caixa para nova localização",
        requiresLocation: true,
      };
    case "entry":
      return {
        title: "Registrar Entrada",
        description: "Registrar entrada de documentos na caixa",
        requiresLocation: false,
      };
    case "exit":
      return {
        title: "Registrar Saída",
        description: "Retirar a caixa da prateleira",
        requiresLocation: false,
      };
    case "confirm_arrival":
      return {
        title: "Confirmar Chegada",
        description: "Confirmar que a caixa chegou ao destino",
        requiresLocation: false,
      };
    case "finalize_deallocation":
      return {
        title: "Finalizar Desalocação",
        description: "Finalizar processo de desalocação da caixa",
        requiresLocation: false,
      };
    default:
      return {
        title: "Ação",
        description: "Executar ação na caixa",
        requiresLocation: false,
      };
  }
};

export const ActionModal: React.FC<ActionModalProps> = ({
  open,
  onClose,
  onConfirm,
  actionType,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<ActionFormData>({
    notes: "",
    module: "",
    line: "",
    column: "",
    slot: "",
  });

  const config = getActionConfig(actionType);

  const handleChange =
    (field: keyof ActionFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = () => {
    onConfirm(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      notes: "",
      module: "",
      line: "",
      column: "",
      slot: "",
    });
    onClose();
  };

  const isFormValid = () => {
    if (config.requiresLocation) {
      return (
        formData.module?.trim() &&
        formData.line?.trim() &&
        formData.column?.trim() &&
        formData.slot?.trim()
      );
    }
    return true;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{config.title}</Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {config.description}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Observações"
            value={formData.notes}
            onChange={handleChange("notes")}
            fullWidth
            multiline
            rows={3}
            placeholder="Digite suas observações sobre esta ação..."
          />

          {config.requiresLocation && (
            <>
              <Typography
                variant="subtitle2"
                sx={{ mt: 1, fontWeight: "bold" }}
              >
                Nova Localização:
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <TextField
                    label="Módulo"
                    value={formData.module}
                    onChange={handleChange("module")}
                    fullWidth
                    required
                    placeholder="Ex: A"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <TextField
                    label="Linha"
                    value={formData.line}
                    onChange={handleChange("line")}
                    fullWidth
                    required
                    placeholder="Ex: 01"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <TextField
                    label="Coluna"
                    value={formData.column}
                    onChange={handleChange("column")}
                    fullWidth
                    required
                    placeholder="Ex: 05"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                  <TextField
                    label="Slot"
                    value={formData.slot}
                    onChange={handleChange("slot")}
                    fullWidth
                    required
                    placeholder="Ex: 02"
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit" disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Processando..." : "Confirmar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
