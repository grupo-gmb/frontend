"use client";
import { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button, Chip, IconButton } from "@mui/material";
import Layout from "@/components/layout/_Layout";
import { useSnackbar } from "@/context/SnackBarContext";
import { useDialog } from "@/context/DialogContext";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import ClientModal from "./components/ClientModal";
import { ClientData } from "@/types/client";
import TableComponent, { Column } from "@/components/ui/Table";
import * as clientService from "@/services/clientService";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { usePermissions } from "@/hooks/usePermissions";

const statusOptions = ["Todos", "Ativo", "Inativo"];

const ClientPage = () => {
  const { showSnackbar } = useSnackbar();
  const { confirm } = useDialog();
  const { hasPermission } = usePermissions();

  const [clients, setClients] = useState<ClientData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Novo Cliente");
  const [modalUpdate, setModalUpdate] = useState(false);
  const [editingClient, setEditingClient] = useState<
    Partial<ClientData> | undefined
  >(undefined);

  //Função para buscar os dados da API
  const fetchClients = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await clientService.getClients();
      setClients(data);
      console.log("console", data);
    } catch (error) {
      showSnackbar({ message: "Erro ao buscar clientes.", severity: "error" });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [showSnackbar]);

  // 4. useEffect para buscar os dados ao montar o componente
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const columns: Column<ClientData>[] = [
    {
      key: "id",
      header: "ID",
    },
    {
      key: "name",
      header: "Nome",
    },
    {
      key: "cnpj",
      header: "CNPJ",
      render: (client) =>
        client.cnpj.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        ),
    },
    {
      key: "address",
      header: "Endereço",
    },
    {
      key: "active",
      header: "Status",
      align: "center",
      render: (client) => (
        <Chip
          label={client.active ? "Ativo" : "Inativo"}
          color={client.active ? "success" : "error"}
          size="small"
        />
      ),
    },
  ];

  function handleOpenNew() {
    setModalTitle("Novo Cliente");
    setModalUpdate(false);
    setEditingClient(undefined);
    setModalOpen(true);
  }
  const handleSaveCliente = async (data: ClientData) => {
    try {
      console.log(modalUpdate, editingClient?.id);
      if (modalUpdate && editingClient?.id) {
        const response = await clientService.updateClient(
          editingClient.id,
          data
        );
        showSnackbar({
          message: response.message || "Cliente atualizado com sucesso!",
          severity: "success",
        });
      } else {
        const response = await clientService.createClient(data);
        showSnackbar({
          message: response.message || "Cliente criado com sucesso!",
          severity: "success",
        });
      }

      fetchClients();
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      console.log(errorMessage);
      showSnackbar({ message: errorMessage, severity: "error" });
    }
  };

  function handleOpenEdit(data: ClientData) {
    setModalTitle("Atualizar Cliente");
    setModalUpdate(true);
    setEditingClient(data);
    setModalOpen(true);

    // setClienteParaEditar(cliente); // se quiser editar
  }

  const handleDelete = async (data: ClientData) => {
    if (!data.id) {
      showSnackbar({
        message: "ID do cliente está inválido. Não é possível excluir",
        severity: "error",
      });
      return;
    }
    const confirmed = await confirm({
      title: `Excluir Cliente`,
      description: `Você tem certeza que deseja excluir: ${data.name}? Esta ação não poderá ser desfeita`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
    });
    if (confirmed) {
      try {
        await clientService.deleteClient(data.id);
        showSnackbar({
          message: "Cliente deletado com sucesso!",
          severity: "success",
        });
      } catch (error) {
        showSnackbar({
          message: "Erro ao excluir o cliente.",
          severity: "error",
        });
      }
    }
  };

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
          <Typography variant="h4">Clientes</Typography>

          <Button
            onClick={() => handleOpenNew()}
            variant="contained"
            startIcon={<AddCircle />}
            disabled={!hasPermission("company:create")}
            title={
              !hasPermission("company:create")
                ? "Você não tem permissão para criar clientes"
                : ""
            }
          >
            Novo Cliente
          </Button>
        </Box>

        <TableComponent<ClientData>
          columns={columns}
          data={clients}
          renderRowActions={(client) => (
            <>
              <IconButton
                disabled={!hasPermission("company:update")}
                title={
                  !hasPermission("company:update")
                    ? "Você não tem permissão para criar clientes"
                    : ""
                }
                color="primary"
                onClick={() => handleOpenEdit(client)}
              >
                <Edit />
              </IconButton>
              <IconButton
                disabled={!hasPermission("company:delete")}
                title={
                  !hasPermission("company:delete")
                    ? "Você não tem permissão para criar clientes"
                    : ""
                }
                color="error"
                onClick={() => handleDelete(client)}
              >
                <Delete />
              </IconButton>
            </>
          )}
        />
      </Box>
      <ClientModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalTitle={modalTitle}
        onSave={handleSaveCliente}
        isUpdate={modalUpdate}
        initialData={editingClient}
      ></ClientModal>
    </Layout>
  );
};

export default ClientPage;
