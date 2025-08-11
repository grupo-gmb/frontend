"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

// Define a estrutura de uma coluna
export interface Column<T> {
  key: keyof T | "actions"; // Chave do dado ou 'actions' para a coluna de ações
  header: string; // Texto do cabeçalho
  render?: (item: T) => React.ReactNode; // Função de renderização customizada para a célula
  align?: "left" | "right" | "center";
}

// Define as props do nosso componente de tabela
interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderRowActions?: (item: T) => React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
}

const TableComponent = <T extends {}>({
  columns,
  data,
  renderRowActions,
  isLoading = false,
  emptyMessage = "Nenhum item encontrado.",
}: TableProps<T>) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} variant="elevation">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={String(col.key)} align={col.align || "left"}>
                {col.header}
              </TableCell>
            ))}
            {renderRowActions && <TableCell align="center">Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell
                    key={`${String(col.key)}-${rowIndex}`}
                    align={col.align || "left"}
                  >
                    {col.render
                      ? col.render(item)
                      : (item[col.key as keyof T] as React.ReactNode)}
                  </TableCell>
                ))}
                {renderRowActions && (
                  <TableCell align="center">{renderRowActions(item)}</TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (renderRowActions ? 1 : 0)}
                align="center"
              >
                <Typography sx={{ p: 2, color: "text.secondary" }}>
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
