"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { PatternFormat } from "react-number-format";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClientData } from "@/types/client";

// Esquema de validação Yup
const schema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  address: yup.string().required("Endereço obrigatório"),
  cnpj: yup
    .string()
    .matches(/^\d{14}$/, "CNPJ inválido")
    .required("CNPJ obrigatório"),
  active: yup.boolean().required(),
});

interface ClientFormProps {
  initialData?: Partial<ClientData>;
  onSubmit: (data: ClientData) => void;
  isUpdate?: boolean;
  children?: React.ReactNode;
}

const ClientForm: React.FC<ClientFormProps> = ({
  initialData,
  onSubmit,
  isUpdate,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientData>({
    defaultValues: {
      id: initialData?.id || "",
      name: initialData?.name || "",
      cnpj: initialData?.cnpj || "",
      address: initialData?.address || "",
      active: initialData?.active ?? true, // sempre boolean
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome do cliente*"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Endereço*"
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Controller
            name="cnpj"
            control={control}
            render={({ field }) => (
              <PatternFormat
                format="##.###.###/####-##"
                allowEmptyFormatting
                mask=" "
                value={field.value}
                onValueChange={(values) => {
                  field.onChange(values.value); // valor limpo (só números)
                }}
                customInput={TextField}
                label="CNPJ*"
                fullWidth
                error={!!errors.cnpj}
                helperText={errors.cnpj?.message}
              />
            )}
          />
        </Grid>
        {isUpdate && (
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Ativo"
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(_, checked) => field.onChange(checked)}
                      color="primary"
                    />
                  }
                />
              )}
            />
          </Grid>
        )}
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        fullWidth
      >
        {isUpdate ? "Atualizar" : "Cadastrar"}
      </Button>
    </Box>
  );
};

export default ClientForm;
