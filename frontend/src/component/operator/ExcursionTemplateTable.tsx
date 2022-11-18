import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { OperatorExcursionTemplateResponse } from "../../dto/response/operator/OperatorExcursionTemplateResponse";
import { axios } from "../../util/AxiosInterceptor";
import { AxiosResponse } from "axios";
import { api } from "../../constant/api";
import { SpinnerFullScreen } from "../SpinnerFullScreen";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { isAllAvailable } from "../../util/AnimalUtil";
import Button from "@mui/material/Button";
import { AnimalTable } from "./AnimalTable";
import { PlanedExcursionTable } from "./PlanedExcursionTable";

const ExcursionTemplateTableHeader = (): ReactElement => {
  return (
    <TableHead>
      <TableRow>
        <TableCell width={1} />
        <TableCell>Id</TableCell>
        <TableCell>Price</TableCell>
        <TableCell align={"center"} width={"240px"}>
          Available
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const ExcursionTemplateTableRowCollapse = (props: {
  row: OperatorExcursionTemplateResponse;
  open: boolean;
}): ReactElement => {
  const [tab, setTab] = useState(0);

  return (
    <Collapse in={props.open} unmountOnExit>
      <Box style={{ margin: "20px", marginTop: 0 }}>
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
          <Tab label={"Animals"} />
          <Tab label={"Planed Excursions"} />
        </Tabs>
        <Box hidden={tab !== 0}>
          <AnimalTable animals={props.row.animals} />
        </Box>
        <Box hidden={tab !== 1}>
          <Button
            variant={"outlined"}
            sx={{ m: 1 }}
            disabled={isAllAvailable(props.row)}
          >
            Plane new
          </Button>
          <PlanedExcursionTable excursions={props.row.excursions} />
        </Box>
      </Box>
    </Collapse>
  );
};

const ExcursionTemplateTableRow = (props: {
  row: OperatorExcursionTemplateResponse;
}): ReactElement => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{props.row.id}</TableCell>
        <TableCell>{props.row.price}</TableCell>
        <TableCell align={"center"}>
          {isAllAvailable(props.row) ? (
            <ClearIcon color={"error"} />
          ) : (
            <CheckIcon color={"success"} />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={4}>
          <ExcursionTemplateTableRowCollapse open={open} row={props.row} />
        </TableCell>
      </TableRow>
    </>
  );
};

export const ExcursionTemplateTable = (): ReactElement => {
  const [data, setData] = useState<OperatorExcursionTemplateResponse[]>([]);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(api.operator.templates.getAll)
      .then((x: AxiosResponse<OperatorExcursionTemplateResponse[]>) => {
        setData(x.data);
      })
      .catch(alert)
      .finally(() => setIsSpinner(false));
  }, []);

  return (
    <Container>
      <Typography variant={"h4"} m={2}>
        Excursions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <ExcursionTemplateTableHeader />
          <TableBody>
            {data.map((row) => (
              <ExcursionTemplateTableRow
                key={`excursion-template-${row.id}`}
                row={row}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isSpinner && <SpinnerFullScreen />}
    </Container>
  );
};
