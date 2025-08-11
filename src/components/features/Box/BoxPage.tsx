"use client";

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
  Button,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import Layout from "@/components/layout/_Layout";
import { useSnackbar } from "@/context/SnackBarContext";
import { useDialog } from "@/context/DialogContext";
import { usePermissions } from "@/hooks/usePermissions";
import { useCallback, useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";

import { AddCircle, Delete, Edit, MoreHoriz } from "@mui/icons-material";
import TableComponent, { Column } from "@/components/ui/Table";
import { BoxData, DocumentData } from "@/types/box";
import BoxModal from "./components/BoxModal";
import * as boxService from "@/services/boxService";
import * as documentService from "@/services/documentService";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { getClients } from "@/services/clientService";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import BoxDetailsAccordion from "./components/BoxDetailsAccordion";

const BoxPage = () => {
  const { showSnackbar } = useSnackbar();
  const { confirm } = useDialog();
  const { hasPermission } = usePermissions();

  const [boxes, setBoxes] = useState<BoxData[]>([]);
  const [clients, setClients] = useState<{ id?: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Nova Caixa");
  const [modalUpdate, setModalUpdate] = useState(false);
  const [editingBox, setEditingBox] = useState<Partial<BoxData> | undefined>(
    undefined
  );
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedBoxDetails, setSelectedBoxDetails] = useState<BoxData | null>(
    null
  );
  const [selectedDocumentsDetails, setSelectedDocumentsDetails] = useState<
    DocumentData[] | null
  >(null);

  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterClient, setFilterClient] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const getStatusDisplay = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "ocioso":
        return "Na prateleira";
      case "disponivel":
        return "Disponível";
      case "pendente":
        return "Pendente";
      case "em_transito":
        return "Em trânsito";
      case "desalocacao":
        return "Desalocada";
      default:
        return status;
    }
  };

  const columns: Column<BoxData>[] = [
    {
      key: "id",
      header: "id",
    },
    {
      key: "code",
      header: "Código",
    },
    {
      key: "company.name" as keyof BoxData,
      header: "Cliente",
      render: (box) => box.company?.name || "N/A",
    },
    {
      key: "description",
      header: "Descrição",
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (box) => (
        <Chip
          label={getStatusDisplay(box.status)}
          sx={{
            backgroundColor:
              box.status === "disponivel"
                ? "#4caf50"
                : box.status === "ocioso"
                  ? "#1b0694"
                  : box.status === "desalocacao"
                    ? "#be5518"
                    : box.status === "em_transito"
                      ? "#ff9800"
                      : box.status === "pendente"
                        ? "#2196f3"
                        : "#9e9e9e",
            color: "white",
          }}
          size="small"
        />
      ),
    },
    {
      key: "created_at",
      header: "Criado Em",
      render: (box) =>
        box.created_at
          ? format(box.created_at, "dd/MM/yyyy HH:mm", {
              locale: ptBR,
            })
          : "N/A",
    },
  ];

  function handleOpenNew() {
    setModalTitle("Nova Caixa");
    setModalUpdate(false);
    setEditingBox(undefined);
    setModalOpen(true);
  }

  const handleDelete = async (data: BoxData) => {
    if (!data.id) {
      showSnackbar({
        message: "ID da caixa está inválido. Não é possível excluir",
        severity: "error",
      });
      return;
    }
    const confirmed = await confirm({
      title: `Excluir Caixa`,
      description: `Você tem certeza que deseja excluir: ${data.code}? Esta ação não poderá ser desfeita`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
    });
    if (confirmed) {
      try {
        console.log("deletar");
        showSnackbar({
          message: "Caixa deletada com sucesso!",
          severity: "success",
        });
      } catch (error) {
        showSnackbar({
          message: "Erro ao excluir o caixa.",
          severity: "error",
        });
      }
    }
  };

  async function handleOpenView(data: BoxData) {
    setModalTitle(`Detalhes da Caixa: ${data.code}`);
    try {
      const detailedBox = await boxService.getBoxById(data.id!); //chama api com o id
      console.log("Dados fetched da API:", detailedBox);
      const detailedDocument = await documentService.getDocumentsById(data.id!); //chama api, mandando o id da caixa
      console.log("Dados fetched da API:", detailedDocument);
      const documentsArray: DocumentData[] = Array.isArray(detailedDocument)
        ? detailedDocument.map((doc) => ({
            id: doc.id || "", // Garante que id seja string, mesmo se undefined
            box_id: doc.box_id,
            company_id: doc.company_id,
            description: doc.description,
            document_name: doc.document_name,
            status: doc.status,
            type_document: doc.type_document,
            user_id: doc.user_id,
          }))
        : detailedDocument
          ? [
              {
                id: detailedDocument.id || "",
                box_id: detailedDocument.box_id,
                company_id: detailedDocument.company_id,
                description: detailedDocument.description,
                document_name: detailedDocument.document_name,
                status: detailedDocument.status || "",
                type_document: detailedDocument.type_document,
                user_id: detailedDocument.user_id,
              },
            ]
          : [];

      setSelectedBoxDetails({ ...detailedBox, documents: documentsArray }); //Armazena os dados fetched
      setSelectedDocumentsDetails([detailedDocument]);
      setDetailsModalOpen(true);
    } catch (error) {
      showSnackbar({
        message: "Erro ao buscar os detalhes da caixa",
        severity: "error",
      });
    }
  }

  const handleSaveBox = async (data: BoxData) => {
    try {
      console.log(modalUpdate, editingBox?.id);
      if (modalUpdate && editingBox?.id) {
        console.log("box editando");
        showSnackbar({
          message: "Cliente atualizado com sucesso!",
          severity: "success",
        });
      } else {
        const response = await boxService.createBox(data);
        showSnackbar({
          message: "Cliente criado com sucesso!",
          severity: "success",
        });
      }

      //fetchClients();
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      console.log(errorMessage);
      showSnackbar({ message: errorMessage, severity: "error" });
    }
  };

  //Função para buscar os dados da API
  const fetchBoxes = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await boxService.getBox();
      if (!data) {
        setBoxes([]);
        return;
      }
      const boxesWithDocs = await Promise.all(
        data.map(async (box) => {
          if (!box.id) return box;
          const docs = await documentService.getDocumentsById(box.id);
          return {
            ...box,
            document: docs || [],
          };
        })
      );
      console.log("Boxes fetched:", boxesWithDocs);
      setBoxes(boxesWithDocs);
    } catch (error) {
      showSnackbar({ message: "Erro ao buscar caixas", severity: "error" });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [showSnackbar]);

  const filteredBoxes = boxes.filter((box) => {
    // Filtro por status
    if (filterStatus && box.status !== filterStatus) return false;

    // Filtro por cliente
    if (filterClient && box.company?.id !== filterClient) return false;

    // Pesquisa por texto
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();

      // Checa descrição da caixa
      const matchesBoxDescription = box.description
        ?.toLowerCase()
        .includes(term);

      // Se não há termos de pesquisa, retorna tudo
      if (!searchTerm.trim()) return true;

      const lowerSearch = searchTerm.toLowerCase();

      // Garante que o array de documentos exista
      const documents = box.documents ?? [];

      // Verifica se algum documento da caixa contém o termo na descrição
      console.log("documents", documents);
      return documents.some(
        (doc) =>
          doc.description && doc.description.toLowerCase().includes(lowerSearch)
      );

      // Checa documentos (descrição, nome, tipo)
      const documentsMatch = (box.documents ?? []).some((doc) => {
        return (
          doc.description?.toLowerCase().includes(term) ||
          doc.document_name?.toLowerCase().includes(term) ||
          doc.type_document?.toLowerCase().includes(term)
        );
      });
      

      if (!matchesBoxDescription && !documentsMatch) {
        return false;
      }
    }

    return true;
  });

  useEffect(() => {
    fetchBoxes();
    getClients().then((data) => {
      setClients(data.map((c) => ({ id: c.id, name: c.name })));
    });
  }, [fetchBoxes]);
  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Caixas
          </Typography>
          <Button
            onClick={() => handleOpenNew()}
            variant="contained"
            startIcon={<AddCircle />}
            disabled={!hasPermission("box:create")}
            title={
              !hasPermission("box:create")
                ? "Você não tem permissão para criar clientes"
                : ""
            }
          >
            Nova caixa
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
          {/* Filtro por Status */}
          <TextField
            select
            size="small"
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="pendente">Pendente</MenuItem>
            <MenuItem value="disponivel">Disponível</MenuItem>
            <MenuItem value="ocioso">Na Prateleira</MenuItem>
            <MenuItem value="em_transito">Em Trânsito</MenuItem>
            <MenuItem value="desalocacao">Desalocação</MenuItem>
            {/* Adicione outros status conforme necessário */}
          </TextField>

          {/* Filtro por Cliente */}
          <TextField
            select
            size="small"
            label="Cliente"
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">Todos</MenuItem>
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Campo de Pesquisa */}
          <TextField
            size="small"
            label="Pesquisar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
        </Box>
        <TableComponent<BoxData>
          columns={columns}
          data={filteredBoxes}
          renderRowActions={(box) => (
            <MoreHoriz color="primary" onClick={() => handleOpenView(box)}>
              <Edit />
            </MoreHoriz>
          )}
        />
      </Box>

      <BoxModal
        clients={clients}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalTitle={modalTitle}
        onSave={handleSaveBox}
        isUpdate={modalUpdate}
        initialData={editingBox}
      ></BoxModal>

      <Modal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        title={modalTitle}
        maxWidth="md"
        fullWidth
      >
        {selectedBoxDetails ? (
          <BoxDetailsAccordion
            box={selectedBoxDetails}
            document={selectedBoxDetails.documents || []}
          />
        ) : (
          <Typography>Carregando dados...</Typography>
        )}
      </Modal>
    </Layout>
  );
};

export default BoxPage;
