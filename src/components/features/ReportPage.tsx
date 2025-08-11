"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  MenuItem,
  Button,
  Stack,
  Paper,
  Autocomplete,
} from "@mui/material";
import Layout from "@/components/layout/_Layout";
import { getClients } from "@/services/clientService"; // serviço que busca clientes
import { reportService } from "@/services/reportService";

// Períodos exemplo
const periodos = [
  { value: "neste_mes", label: "Neste mês" },
  { value: "ultimo_mes", label: "Último mês" },
  { value: "ultimo_trimestre", label: "Último trimestre" },
  { value: "ano_corrente", label: "Ano corrente" },
];

interface ClientOption {
  id: string;
  name: string;
}

const ReportPage = () => {
  const [tipoRelatorio, setTipoRelatorio] = useState<string>("armazenamento");
  const [clientes, setClientes] = useState<ClientOption[]>([]);
  const [clienteSelecionado, setClienteSelecionado] =
    useState<ClientOption | null>(null);
  const [periodo, setPeriodo] = useState<string>("");

  // Busca lista de clientes ao montar
  useEffect(() => {
    getClients()
      .then((data) => {
        // Supondo que sua API retorna { id, name }
        setClientes(data.map((c: any) => ({ id: c.id, name: c.name })));
      })
      .catch((err) => {
        console.error("Erro ao buscar clientes:", err);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clienteSelecionado) return;
    try {
      const pdfBlob = await reportService.getStorageReport(`${periodo}`);
      const url = URL.createObjectURL(pdfBlob);
      window.open(url); // abre numa nova aba
      URL.revokeObjectURL(url); // limpa referência
    } catch (err) {
      console.error("Erro ao baixar relatório:", err);
    }

    // Aqui você implementa a ação de gerar relatório (chamada para sua API)
    alert(
      `Gerar relatório do tipo: ${tipoRelatorio}
Cliente: ${clienteSelecionado.name} (ID: ${clienteSelecionado.id})
Período: ${periodo}`
    );

    // Exemplo de chamada (AJUSTAR URL):
    // reportService.generateReport({
    //   type: tipoRelatorio,
    //   company_id: clienteSelecionado.id,
    //   periodo
    // });
  }

  

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Relatórios
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Gere relatórios sobre o armazenamento de documentos
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* TIPOS DE RELATÓRIO */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <Box p={2}>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              Opções de Relatório
            </FormLabel>
            <RadioGroup
              value={tipoRelatorio}
              onChange={(e) => setTipoRelatorio(e.target.value)}
            >
              <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
                <FormControlLabel
                  value="armazenamento"
                  control={<Radio />}
                  label="Relatório de Armazenamento – Mostra o estado atual do armazenamento de documentos."
                />
              </Paper>
              <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
                <FormControlLabel
                  disabled
                  value="atividade"
                  control={<Radio />}
                  label="Relatório de Atividade – Registra todas as atividades relacionadas aos documentos."
                />
              </Paper>
              <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
                <FormControlLabel
                  disabled
                  value="utilizacao"
                  control={<Radio />}
                  label="Relatório de Utilização – Analisa a frequência de acesso e utilização dos documentos."
                />
              </Paper>
            </RadioGroup>
          </Box>
        </Card>

        <Stack spacing={2} mb={3}>
          {/* AUTOCOMPLETE CLIENTE */}
          <Autocomplete
            sx={{ p: { xs: 2, md: 4 }, mt: 2 }}
            options={clientes}
            getOptionLabel={(option) => option.name}
            value={clienteSelecionado}
            onChange={(_, newValue) => setClienteSelecionado(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cliente"
                placeholder="Digite para buscar o cliente"
                fullWidth
                required
              />
            )}
          />

          {/* FILTRO PERÍODO */}
          <TextField
            select
            fullWidth
            label="Período"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            required
          >
            <MenuItem value="">Selecione</MenuItem>
            {periodos.map((p) => (
              <MenuItem key={p.value} value={p.value}>
                {p.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* BOTÃO */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          disabled={!clienteSelecionado || !periodo}
        >
          Gerar Relatório
        </Button>
      </form>
    </Layout>
  );
};

export default ReportPage;
