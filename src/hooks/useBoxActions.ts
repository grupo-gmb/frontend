import { useState } from "react";
import * as movementService from "@/services/movementService";
import { ActionFormData } from "@/components/features/Box/components/ActionModal";
import { useSession } from "next-auth/react";

export const useBoxActions = (boxId: string, onSuccess?: () => void) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const executeAction = async (actionType: string, formData: ActionFormData) => {
    try {
      setIsLoading(true);

      let location = "";
      if (formData.module && formData.line && formData.column && formData.slot) {
        location = `${formData.module}${formData.line}${formData.column}-${formData.slot}`;
      }
       
      const userId = String(session?.user?.id || ""); // Fallback user ID if session is not available
      console.log("userId", session?.user?.id);

      const movementData = {
        box_id: boxId,
        user_id: "4f89d7f284ef4314" , // TODO: get from context
        notes: formData.notes || getDefaultNotes(actionType),
      };

      switch (actionType) {
        case "allocate":
          await movementService.createMovement({
            ...movementData,
            movement_type: "alocacao",
            to_location: location,
          });
          break;

        case "transfer":
          await movementService.createMovement({
            ...movementData,
            movement_type: "transferencia",
            from_location: "", // TODO: get current location
            to_location: location,
          });
          break;

        case "entry":
          await movementService.createMovement({
            ...movementData,
            movement_type: "entrada",
          });
          break;

        case "exit":
          await movementService.createMovement({
            ...movementData,
            movement_type: "saida",
          });
          break;

        case "confirm_arrival":
          await movementService.createMovement({
            ...movementData,
            movement_type: "entrada",
          });
          break;

        case "finalize_deallocation":
          await movementService.createMovement({
            ...movementData,
            movement_type: "desalocacao",
          });
          break;

        default:
          throw new Error(`Ação não reconhecida: ${actionType}`);
      }

      onSuccess?.();
      console.log(`${actionType} executado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao executar ${actionType}:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { executeAction, isLoading };
};

const getDefaultNotes = (actionType: string): string => {
  switch (actionType) {
    case "allocate":
      return "Movimento de alocação - Incluindo no gerenciamento.";
    case "transfer":
      return "Movimento de transferência - Ajuste de logística.";
    case "entry":
      return "Movimento de entrada de rotina.";
    case "exit":
      return "Movimento de saída de rotina.";
    case "confirm_arrival":
      return "Movimento de transferência - Chegada Confirmada.";
    default:
      return "Movimento registrado via sistema.";
  }
};