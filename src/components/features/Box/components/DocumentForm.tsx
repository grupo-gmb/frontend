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
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { DOCUMENT_TYPES_ARRAY, DocumentType } from "@/types/documentTypes";

interface DocumentFormData {
  name: string;
  type: DocumentType | null;
  description: string;
}

interface DocumentFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (document: DocumentFormData) => void;

  isLoading?: boolean;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  open,
  onClose,
  onSave,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<DocumentFormData>({
    name: "",
    type: null,
    description: "",
  });

  const handleChange =
    (field: keyof DocumentFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleAutocompleteChange = (
    event: any,
    newValue: DocumentType | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      type: newValue,
    }));
  };

  const handleSubmit = async () => {
    if (formData.name.trim() && formData.type) {
      await onSave(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: "", type: null, description: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Adicionar Documento</Typography>
          <IconButton onClick={handleClose} size="small" disabled={isLoading}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Nome do Documento"
            value={formData.name}
            onChange={handleChange("name")}
            fullWidth
            required
            disabled={isLoading}
            placeholder="Ex: Contrato de Prestação de Serviços"
          />
          <Autocomplete<DocumentType>
            options={DOCUMENT_TYPES_ARRAY}
            value={formData.type}
            onChange={handleAutocompleteChange}
            disabled={isLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo do Documento"
                required
                fullWidth
                inputProps={{
                  ...params.inputProps,
                  style: {
                    ...params.inputProps.style,
                    textTransform: "uppercase",
                  },
                }}
              />
            )}
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;
              return (
                <li
                  key={key}
                  {...otherProps}
                  style={{ textTransform: "uppercase" }}
                >
                  {option}
                </li>
              );
            }}
            freeSolo={false}
            autoHighlight
            clearOnEscape
            filterOptions={(options, { inputValue }) =>
              options.filter((option) =>
                option.toLowerCase().includes(inputValue.toLowerCase())
              )
            }
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
          />
          <TextField
            label="Descrição"
            value={formData.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            rows={3}
            disabled={isLoading}
            placeholder="Descrição do documento"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit" disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.name.trim() || !formData.type || isLoading}
          startIcon={isLoading ? <CircularProgress size={16} /> : undefined}
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export type { DocumentFormData };
