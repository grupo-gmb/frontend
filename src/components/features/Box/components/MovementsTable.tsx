import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { BoxData } from "@/types/box";

interface MovementsTableProps {
  movementsArray: NonNullable<BoxData["movement"]>;
}

export const MovementsTable: React.FC<MovementsTableProps> = ({
  movementsArray,
}) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Tipo</TableCell>
          <TableCell>De</TableCell>
          <TableCell>Para</TableCell>
          <TableCell>Data</TableCell>
          <TableCell>Observações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {movementsArray.length > 0 ? (
          movementsArray.map((movement) => (
            <TableRow key={movement.id}>
              <TableCell>{movement.movement_type}</TableCell>
              <TableCell>{movement.from_location ?? "-"}</TableCell>
              <TableCell>{movement.to_location}</TableCell>
              <TableCell>
                {format(new Date(movement.movement_date), "dd/MM/yyyy HH:mm")}
              </TableCell>
              <TableCell>{movement.notes}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} align="center">
              <Typography color="text.secondary">
                Sem movimentações registradas.
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
