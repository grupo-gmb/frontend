"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Table,
  Grid,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Chip,
  Card,
  Button,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/HistoryEdu";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import { Add } from "@mui/icons-material";

import { BoxData, DocumentData } from "@/types/box";
import * as boxService from "@/services/boxService";
import * as documentService from "@/services/documentService";

import { MovementsTable } from "./MovementsTable";
import { DocumentForm, DocumentFormData } from "./DocumentForm";
import { ActionModal, ActionFormData } from "./ActionModal";
import { StatusActionButtons } from "./StatusActionButtons";
import {
  getStatusDisplay,
  getStatusColor,
  canAddDocuments,
} from "@/utils/statusUtils";
import { useBoxActions } from "@/hooks/useBoxActions";
import { useSession } from "next-auth/react";
import { useSnackbar } from "@/context/SnackBarContext";

interface BoxDetailsAccordionProps {
  box: BoxData;
  document: DocumentData[];
  onDocumentAdded: (newDocument: DocumentData) => void;
}

export default function BoxDetailsAccordion({
  box,
  document,
  onDocumentAdded,
}: BoxDetailsAccordionProps) {
  const { data: session } = useSession();
  const { showSnackbar } = useSnackbar();
  // Estados
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [documents, setDocuments] = useState<DocumentData[]>(document || []);
  const [currentBox, setCurrentBox] = useState<BoxData>(box);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [currentActionType, setCurrentActionType] = useState<string>("");

  // Hooks customizados
  const { executeAction, isLoading } = useBoxActions(
    currentBox.id!,
    fetchBoxDetails
  );

  // Função para buscar detalhes atualizados da caixa
  async function fetchBoxDetails() {
    if (currentBox.id) {
      try {
        const updatedBox = await boxService.getBoxById(currentBox.id);
        setCurrentBox(updatedBox);
      } catch (error) {
        console.error("Erro ao buscar detalhes da caixa:", error);
      }
    }
  }

  // Efeitos
  useEffect(() => {
    setCurrentBox(box);
    console.log("Documents:", documents);
  }, [box]);

 

  // Handlers para documentos
  const handleAddDocument = async (formData: DocumentFormData) => {
    if (!currentBox.id || !currentBox.company_id) {
      console.error(
        "ID da caixa ou da empresa não foi encontrado.",
        currentBox
      );
      showSnackbar({
        message: "Erro: Dados da caixa estão incompletos.",
        severity: "error",
      });
      throw new Error("Dados essenciais da caixa estão faltando.");
    }

    if (!formData.type) {
      showSnackbar({
        message: "Erro: O tipo do documento é obrigatório.",
        severity: "error",
      });
      throw new Error("O tipo do documento é obrigatório.");
    }
    try {
      setIsDocumentLoading(true);

      const documentData = {
        box_id: currentBox.id!,
        document_name: formData.name,
        type_document: formData.type,
        user_id: "4f89d7f284ef4314",
        company_id: currentBox.company_id!,
        description: formData.description,
      } as Omit<DocumentData, "id">;

      const createdDocument =
        await documentService.createDocument(documentData);

      onDocumentAdded(createdDocument);

      setDocuments((prev) => [...prev, createdDocument]);
      showSnackbar({
        message: "Documento adicionado com sucesso!",
        severity: "success",
      });
    } catch (error) {
      showSnackbar({
        message: "Erro ao adicionar documento!",
        severity: "error",
      });
      console.error("Erro ao criar documento:", error);
    } finally {
      setIsDocumentLoading(false);
    }
  };

  // Handlers para ações
  const handleActionClick = (actionType: string) => {
    setCurrentActionType(actionType);
    setActionModalOpen(true);
  };

  const handleActionConfirm = async (formData: ActionFormData) => {
    try {
      await executeAction(currentActionType, formData);
      switch (currentActionType) {
        case "allocate":
          showSnackbar({
            message: "Caixa alocada!",
            severity: "success",
          });
          break;
        case "transfer":
          showSnackbar({
            message: "Caixa transferida! Aguardando confirmação de chegada.",
            severity: "warning",
          });
          break;
        case "entry":
          showSnackbar({
            message: "Entrada registrada!",
            severity: "success",
          });
          break;
        case "exit":
          showSnackbar({
            message: "Saída registrada!",
            severity: "success",
          });
          break;
        case "confirm_arrival":
          showSnackbar({
            message: "Chegada confirmada!",
            severity: "success",
          });
          break;
        case "finalize_deallocation":
          showSnackbar({
            message: "Desalocação finalizada com sucesso!",
            severity: "success",
          });
          break;
        default:
          showSnackbar({
            message: `Ação ${currentActionType} realizada com sucesso!`,
            severity: "success",
          });
      }
    } catch (error) {
      // Error handling já está no hook
    }
  };

  // Dados calculados
  const movementRaw = currentBox.movement;
  const movementsArray = Array.isArray(movementRaw)
    ? movementRaw
    : movementRaw
      ? [movementRaw]
      : [];

  return (
    <Box>
      {/* Status Card */}

      <Card sx={{ p: 2, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">
            Status atual:
            <Chip
              label={getStatusDisplay(currentBox.status)}
              sx={{
                ml: 1,
                backgroundColor: getStatusColor(currentBox.status),
                color: "white",
              }}
              size="small"
            />
          </Typography>
        </Box>

        <StatusActionButtons
          status={currentBox.status || ""}
          onAction={handleActionClick}
          isLoading={isLoading}
        />
      </Card>

      {/* Documentos */}
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <DescriptionIcon sx={{ mr: 1 }} />
          <Typography>Documentos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            <Tooltip
              title={
                !canAddDocuments(currentBox.status)
                  ? `Caixas com status ${getStatusDisplay(currentBox.status)} não permitem adição de documentos`
                  : ""
              }
              placement="top"
              arrow
            >
              <span>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setIsFormOpen(true)}
                  size="small"
                  disabled={
                    !canAddDocuments(currentBox.status) || isDocumentLoading
                  }
                >
                  {isDocumentLoading ? "Salvando..." : "Doc"}
                </Button>
              </span>
            </Tooltip>
          </Box>

          {documents.length > 0 ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Descrição</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* 1. Filtra o array ANTES de renderizar para remover itens nulos */}
                {documents
                  .filter((doc) => doc)
                  .map((doc) => (
                    // 2. O .map() agora só recebe itens válidos e não precisa de lógica condicional
                    <TableRow key={doc.id}>
                      <TableCell>{doc.document_name}</TableCell>
                      <TableCell style={{ textTransform: "uppercase" }}>
                        {doc.type_document}
                      </TableCell>
                      <TableCell>{doc.description}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <Typography color="text.secondary">
              Sem documentos cadastrados.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Informações do Cliente */}
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <PersonIcon sx={{ mr: 1 }} />
          <Typography>Informações do Cliente</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight="bold">Nome:</Typography>
              <Typography>{currentBox.company?.name ?? "-"}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight="bold">CNPJ:</Typography>
              <Typography>
                {currentBox.company?.cnpj?.replace(
                  /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                  "$1.$2.$3/$4-$5"
                ) ?? "-"}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight="bold">Endereço:</Typography>
              <Typography>{currentBox.company?.address ?? "-"}</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight="bold">Status:</Typography>
              <Chip
                label={currentBox.company?.active ? "Ativo" : "Inativo"}
                color={currentBox.company?.active ? "success" : "error"}
                size="small"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Localização */}
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <PlaceIcon sx={{ mr: 1 }} />
          <Typography>Localização</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <b>Código de Localização:</b> {currentBox.location_code ?? "-"}
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Histórico de Movimentação */}
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <HistoryIcon sx={{ mr: 1 }} />
          <Typography>Histórico de Movimentação</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MovementsTable movementsArray={movementsArray} />
        </AccordionDetails>
      </Accordion>

      {/* Modals */}
      <DocumentForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleAddDocument}
        isLoading={isDocumentLoading}
      />

      <ActionModal
        open={actionModalOpen}
        onClose={() => setActionModalOpen(false)}
        onConfirm={handleActionConfirm}
        actionType={currentActionType}
        isLoading={isLoading}
      />
    </Box>
  );
}
