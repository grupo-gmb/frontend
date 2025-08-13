"use client";

import {
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Layout from "@/components/layout/_Layout";
import { useSnackbar } from "@/context/SnackBarContext";
import { useDialog } from "@/context/DialogContext";
import { usePermissions } from "@/hooks/usePermissions";
import { useCallback, useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { AddCircle, Edit, MoreHoriz } from "@mui/icons-material";
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
    { key: "id", header: "ID" },
    { key: "code", header: "Código" },
    {
      key: "company.name" as keyof BoxData,
      header: "Cliente",
      render: (box) => box.company?.name || "N/A",
    },
    { key: "description", header: "Descrição" },
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
          ? format(new Date(box.created_at), "dd/MM/yyyy HH:mm", {
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
    /* ... sua lógica de delete ... */
  };

  async function handleOpenView(data: BoxData) {
    setModalTitle(`Detalhes da Caixa: ${data.code}`);
    try {
      const detailedBox = await boxService.getBoxById(data.id!);
      const fetchedDocuments = await documentService.getDocumentsById(data.id!);
      const documentsArray: DocumentData[] = Array.isArray(fetchedDocuments)
        ? fetchedDocuments.filter((doc) => doc)
        : fetchedDocuments
          ? [fetchedDocuments]
          : [];
      setSelectedBoxDetails({ ...detailedBox, documents: documentsArray });
      setDetailsModalOpen(true);
    } catch (error) {
      showSnackbar({
        message: "Erro ao buscar os detalhes da caixa",
        severity: "error",
      });
    }
  }

  const handleSaveBox = async (data: BoxData) => {
    /* ... sua lógica de save ... */
  };

  // ✅ FUNÇÃO CORRIGIDA
  const handleDocumentAdded = (boxId: string, newDocument: DocumentData) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === boxId) {
          return {
            ...box,
            documents: [...(box.documents || []), newDocument], // ✅ CORRETO: 'documents' (plural)
          };
        }
        return box;
      })
    );
    setSelectedBoxDetails((prevDetails) => {
      if (!prevDetails || prevDetails.id !== boxId) return prevDetails;
      return {
        ...prevDetails,
        documents: [...(prevDetails.documents || []), newDocument],
      };
    });
  };

  // ✅ FUNÇÃO CORRIGIDA
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
          if (!box.id) return { ...box, documents: [] };
          const docs = await documentService.getDocumentsById(box.id);
          const documentsArray = Array.isArray(docs)
            ? docs
            : docs
              ? [docs]
              : [];
          return {
            ...box,
            documents: documentsArray.filter((doc) => doc), // ✅ CORRETO: 'documents' (plural) e limpo
          };
        })
      );
      setBoxes(boxesWithDocs);
    } catch (error) {
      showSnackbar({ message: "Erro ao buscar caixas", severity: "error" });
    } finally {
      setIsLoading(false);
    }
  }, [showSnackbar]);

  // ✅ LÓGICA DE FILTRAGEM SIMPLIFICADA E CORRIGIDA
  const filteredBoxes = boxes.filter((box) => {
    if (filterStatus && box.status !== filterStatus) return false;
    if (filterClient && box.company?.id !== filterClient) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchesBox =
        box.code?.toLowerCase().includes(term) ||
        box.description?.toLowerCase().includes(term);
      const matchesDocuments = (box.documents ?? []).some(
        (doc) =>
          doc.document_name?.toLowerCase().includes(term) ||
          doc.description?.toLowerCase().includes(term)
      );
      return matchesBox || matchesDocuments;
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
            {" "}
            Caixas{" "}
          </Typography>
          <Button
            onClick={handleOpenNew}
            variant="contained"
            startIcon={<AddCircle />}
            disabled={!hasPermission("box:create")}
          >
            {" "}
            Nova caixa{" "}
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
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
          </TextField>
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
                {" "}
                {client.name}{" "}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            label="Pesquisar por Código, Descrição ou Documento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
        </Box>

        <TableComponent<BoxData>
          columns={columns}
          data={filteredBoxes}
          renderRowActions={(box) => (
            <MoreHoriz
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => handleOpenView(box)}
            />
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
      />

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
            onDocumentAdded={(newDocument) =>
              handleDocumentAdded(selectedBoxDetails.id!, newDocument)
            }
          />
        ) : (
          <Typography>Carregando dados...</Typography>
        )}
      </Modal>
    </Layout>
  );
};

export default BoxPage;
