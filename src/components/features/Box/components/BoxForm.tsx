"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Autocomplete,
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
import { BoxData } from "@/types/box";

// Esquema de validação Yup
const schema = yup.object().shape({
  company_id: yup.string().required("ID cliente obrigatório"),
});

interface BoxFormProps {
  clients: { id?: string; name: string }[];
  initialData?: Partial<BoxData>;
  onSubmit: (data: BoxData) => void;
  isUpdate?: boolean;
  children?: React.ReactNode;
}

const BoxForm: React.FC<BoxFormProps> = ({
  clients,
  initialData,
  onSubmit,
  isUpdate,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BoxData>({
    defaultValues: {
      id: initialData?.id || "",
      description: initialData?.description || "",
      company_id: initialData?.company_id || "",
      active: initialData?.active ?? true, // sempre boolean
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled
                label="ID Cliente*"
                fullWidth
                error={!!errors.company_id}
                helperText={errors.company_id?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={clients}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(opt, val) => opt.id === val.id}
                value={clients.find((c) => c.id === field.value) || null}
                onChange={(_event, newValue) =>
                  field.onChange(newValue ? newValue.id : "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cliente*"
                    fullWidth
                    error={!!errors.company_id}
                    helperText={errors.company_id?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                maxRows={20}
                label="Descrição"
                fullWidth
                error={!!errors.company_id}
                helperText={errors.company_id?.message}
              />
            )}
          />
        </Grid>
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

export default BoxForm;
