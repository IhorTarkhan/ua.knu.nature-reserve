import * as React from "react";
import { ReactElement } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { AnimalInfoResponse } from "../../dto/response/AnimalInfoResponse";
import { isAvailable } from "../../util/AnimalUtil";

const AnimalTableHeader = (): ReactElement => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Id</TableCell>
        <TableCell>Nickname</TableCell>
        <TableCell>Lookup</TableCell>
        <TableCell>Behavioral</TableCell>
        <TableCell align={"center"} width={"200px"}>
          Available
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const AnimalTableRow = (props: { row: AnimalInfoResponse }): ReactElement => {
  return (
    <TableRow>
      <TableCell>{props.row.id}</TableCell>
      <TableCell>{props.row.nickname}</TableCell>
      <TableCell>{props.row.lookup}</TableCell>
      <TableCell>{props.row.behavioral}</TableCell>
      <TableCell align={"center"}>
        {isAvailable(props.row) ? (
          <CheckIcon color={"success"} />
        ) : (
          <ClearIcon color={"error"} />
        )}
      </TableCell>
    </TableRow>
  );
};

export const AnimalTable = (props: {
  animals: AnimalInfoResponse[];
}): ReactElement => {
  return (
    <Table size={"small"}>
      <AnimalTableHeader />
      <TableBody>
        {props.animals.map((row) => (
          <AnimalTableRow key={`animal-${row.id}`} row={row} />
        ))}
      </TableBody>
    </Table>
  );
};
