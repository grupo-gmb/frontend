export const getStatusDisplay = (status: string | undefined): string => {
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
      return status || "Status não definido";
  }
};

export const getStatusColor = (status: string | undefined): string => {
  switch (status?.toLowerCase()) {
    case "disponivel":
      return "#4caf50";
    case "ocioso":
      return "#1b0694";
    case "desalocacao":
      return "#be5518";
    case "em_transito":
      return "#ff9800";
    case "pendente":
      return "#2196f3";
    default:
      return "#9e9e9e";
  }
};

export const canAddDocuments = (status: string | undefined): boolean => {
  return status !== "ocioso" && status !== "em_transito";
};