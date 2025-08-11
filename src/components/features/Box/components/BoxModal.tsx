import React, { useState } from "react";
import Modal from "@/components/ui/Modal";

import BoxForm from "./BoxForm";
import { BoxData } from "@/types/box";

interface BoxModalProps {
  clients: { id?: string; name: string }[];
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  modalTitle: string;
  onSave: (data: BoxData) => void;
  isUpdate?: boolean;
  initialData?: Partial<BoxData>;
  children?: React.ReactNode;
}

export default function BoxModal({
  clients,
  modalOpen,
  setModalOpen,
  modalTitle,
  onSave,
  isUpdate,
  initialData,
}: BoxModalProps) {
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Modal open={modalOpen} onClose={handleClose} title={modalTitle}>
      <BoxForm
        clients={clients}
        initialData={initialData}
        onSubmit={(data) => {
          onSave(data);
          handleClose();
        }}
        isUpdate={isUpdate}
      />
    </Modal>
  );
}
