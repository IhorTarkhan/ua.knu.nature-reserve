import * as React from "react";
import { ReactElement } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PlanedExcursionInfoResponse } from "../../dto/response/PlanedExcursionInfoResponse";
import { toLongFormatDate } from "../../util/DateUtil";

const PlanedExcursionTableHeader = (): ReactElement => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Id</TableCell>
        <TableCell>Time</TableCell>
        <TableCell>Operator Nickname</TableCell>
      </TableRow>
    </TableHead>
  );
};

const PlanedExcursionTableRow = (props: {
  row: PlanedExcursionInfoResponse;
}): ReactElement => {
  return (
    <TableRow>
      <TableCell>{props.row.id}</TableCell>
      <TableCell>{toLongFormatDate(props.row.time)}</TableCell>
      <TableCell>{props.row.operatorNickname}</TableCell>
    </TableRow>
  );
};

export const PlanedExcursionTable = (props: {
  excursions: PlanedExcursionInfoResponse[];
}): ReactElement => {
  return (
    <Table size={"small"}>
      <PlanedExcursionTableHeader />
      <TableBody>
        {props.excursions.map((row) => (
          <PlanedExcursionTableRow
            key={`planed-excursion-${row.id}`}
            row={row}
          />
        ))}
      </TableBody>
    </Table>
  );
};
