import React from "react";
import { Box, Typography, Button, Stack, Tooltip } from "@mui/material";
import {
  Assignment,
  SwapHoriz,
  Input,
  CheckCircle,
  Archive,
} from "@mui/icons-material";

interface StatusActionButtonsProps {
  status: string;
  onAction: (actionType: string) => void;
  isLoading?: boolean;
}

const getActionsForStatus = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pendente":
      return [
        {
          label: "Alocar",
          icon: <Assignment />,
          action: "allocate",
          color: "primary" as const,
          tooltip: "Reservar um local na prateleira",
        },
      ];

    case "disponivel":
      return [
        {
          label: "Transferir",
          icon: <SwapHoriz />,
          action: "transfer",
          color: "info" as const,
          tooltip: "Transferir caixa para outro local",
        },
        {
          label: "Entrada",
          icon: <Input />,
          action: "entry",
          color: "success" as const,
          tooltip: "Registrar entrada da caixa em uma prateleira",
        },
      ];

    case "em_transito":
      return [
        {
          label: "Confirmar Chegada",
          icon: <CheckCircle />,
          action: "confirm_arrival",
          color: "success" as const,
          tooltip: "Confirmar chegada no destino",
        },
      ];

    case "ocioso":
      return [
        {
          label: "Retirar da Prateleira",
          icon: <CheckCircle />,
          action: "exit",
          color: "error" as const,
          tooltip: "Retirar a caixa da prateleira",
        },
      ];

    case "desalocacao":
      return [
        {
          label: "Alocar",
          icon: <Archive />,
          action: "finalize_deallocation",
          color: "warning" as const,
          tooltip: "Finalizar processo de desalocação",
        },
      ];

    default:
      return [];
  }
};

export const StatusActionButtons: React.FC<StatusActionButtonsProps> = ({
  status,
  onAction,
  isLoading = false,
}) => {
  const actions = getActionsForStatus(status);

  if (actions.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
        Ações Disponíveis:
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {actions.map((action) => (
          <Tooltip key={action.action} title={action.tooltip}>
            <Button
              variant="contained"
              color={action.color}
              startIcon={action.icon}
              onClick={() => onAction(action.action)}
              size="small"
              disabled={isLoading}
            >
              {action.label}
            </Button>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};
