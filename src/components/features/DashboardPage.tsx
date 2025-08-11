"use client";

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import Layout from "@/components/layout/_Layout";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();
  const recentReports = [
    {
      name: "Relatório de Caixas por Cliente",
      date: "2024-07-26",
      status: "Concluído",
    },
    {
      name: "Relatório de Caixas por Departamento",
      date: "2024-07-25",
      status: "Concluído",
    },
    {
      name: "Relatório de Caixas por Ano",
      date: "2024-07-24",
      status: "Concluído",
    },
    {
      name: "Relatório de Caixas por Tipo de Documento",
      date: "2024-07-23",
      status: "Concluído",
    },
    {
      name: "Relatório de Caixas por Localização",
      date: "2024-07-22",
      status: "Concluído",
    },
  ];

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Stats Cards - Mobile */}
        <Grid
          container
          spacing={6}
          p={2}
          sx={{
            mb: 6,
            display: { sm: "flex", md: "flex", lg: "flex" },

            alignContent: { xs: "center", sm: "flex-start" },
          }}
        >
          {/* Card 1: Total de Caixas */}
          <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent sx={{ textAlign: "center", py: 2 }}>
                <Typography
                  variant="caption"
                  fontSize={14}
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Total de Caixas
                </Typography>
                <Typography variant="h3" color="primary.main" fontWeight="bold">
                  1200
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2: Clientes Cadastrados */}
          <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent sx={{ textAlign: "center", py: 2 }}>
                <Typography
                  variant="caption"
                  fontSize={13}
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Clientes Cadastrados
                </Typography>
                <Typography variant="h3" color="primary.main" fontWeight="bold">
                  350
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3: Relatórios Recentes */}
          <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent sx={{ textAlign: "center", py: 2 }}>
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  fontSize={14}
                  color="text.secondary"
                >
                  Relatórios Recentes
                </Typography>
                <Typography variant="h3" color="primary.main" fontWeight="bold">
                  5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Stats Cards - Desktop */}

        {/* Resumo de Relatórios */}

        {/* Tabela de Relatórios */}
      </Box>
    </Layout>
  );
};

export default DashboardPage;
