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
import { AnimalInfoResponse } from "../../dto/response/AnimalInfoResponse";
import { axios } from "../../util/AxiosInterceptor";
import { AxiosResponse } from "axios";
import { api } from "../../constant/api";
import { SpinnerFullScreen } from "../../component/SpinnerFullScreen";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const isAvailable = (a: AnimalInfoResponse): boolean => {
  return a.alive && a.healthy;
};

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

const AnimalTable = (props: {
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

const ExcursionTemplateTableHeader = (): ReactElement => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>Id</TableCell>
        <TableCell>Price</TableCell>
        <TableCell align={"center"} width={"240px"}>
          Available
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const ExcursionTemplateTableRow = (props: {
  row: OperatorExcursionTemplateResponse;
}): ReactElement => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

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
          {!!props.row.animals.find((x) => !isAvailable(x)) ? (
            <ClearIcon color={"error"} />
          ) : (
            <CheckIcon color={"success"} />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={4}>
          <Collapse in={open} unmountOnExit>
            <Box sx={{ margin: "20px", marginTop: 0 }}>
              <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
                <Tab label={"Animals"} />
                <Tab label={"Planed Excursions"} />
              </Tabs>
              <Box hidden={tab !== 0}>
                <AnimalTable animals={props.row.animals} />
              </Box>
              <Box hidden={tab !== 1}>Item Two</Box>
            </Box>
          </Collapse>
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
    <>
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
    </>
  );
};
