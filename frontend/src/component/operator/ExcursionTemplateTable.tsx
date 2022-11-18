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
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { OperatorPlaneExcursionRequest } from "../../dto/request/operator/OperatorPlaneExcursionRequest";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { OperatorCreateExcursionTemplateRequest } from "../../dto/request/operator/OperatorCreateExcursionTemplateRequest";
import Dnd from "./src/Dnd";

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
  fetchData: () => Promise<any>;
}): ReactElement => {
  const [tab, setTab] = useState(0);
  const [value, setValue] = useState<Dayjs>(
    dayjs(new Date(Date.now() + 3600 * 1000))
  );

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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} sx={{ margin: 1 }} />
              )}
              label={"New excursion time"}
              value={value}
              onChange={(newValue) => setValue(newValue!)}
            />
          </LocalizationProvider>
          <Button
            variant={"outlined"}
            sx={{ m: 1 }}
            disabled={isAllAvailable(props.row)}
            onClick={() => {
              const request: OperatorPlaneExcursionRequest = {
                time: value.toDate(),
                excursionTemplateId: props.row.id,
              };
              console.log(request);
              axios
                .post(api.operator.templates.planeExcursion, request)
                .then(() => props.fetchData())
                .catch(alert);
            }}
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
  fetchData: () => Promise<any>;
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
          <ExcursionTemplateTableRowCollapse
            open={open}
            row={props.row}
            fetchData={props.fetchData}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

const CreatePopup = (props: {
  open: boolean;
  close: () => void;
}): ReactElement => {
  const [price, setPrice] = useState<number | "">("");

  const onAccept = () => {
    const request: OperatorCreateExcursionTemplateRequest = {
      price: 99,
      animalIds: [2, 1],
    };
    console.log(request);
    props.close();
  };

  const handleChangePrice = (e: any) => {
    if (e.target.value == "" || /^[0-9\b]+$/.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle>Create new excursion template</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label={"Price"}
          variant={"outlined"}
          onChange={handleChangePrice}
          value={price}
          sx={{ mt: 1 }}
        />
        <Dnd />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close}>Reject</Button>
        <Button onClick={onAccept} autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ExcursionTemplateTable = (): ReactElement => {
  const [data, setData] = useState<OperatorExcursionTemplateResponse[]>([]);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const fetchData = (): Promise<any> => {
    return axios
      .get(api.operator.templates.getAll)
      .then((x: AxiosResponse<OperatorExcursionTemplateResponse[]>) =>
        setData(x.data)
      )
      .catch(alert);
  };

  useEffect(() => {
    if (!isCreateOpen) fetchData().finally(() => setIsSpinner(false));
  }, [isCreateOpen]);

  return (
    <Container>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant={"h4"} m={2}>
          Excursions
        </Typography>
        <Tooltip title={"Create new"} sx={{ my: "auto" }}>
          <IconButton onClick={() => setIsCreateOpen(true)}>
            <AddIcon fontSize={"large"} />
          </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <ExcursionTemplateTableHeader />
          <TableBody>
            {data.map((row) => (
              <ExcursionTemplateTableRow
                key={`excursion-template-${row.id}`}
                row={row}
                fetchData={fetchData}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isSpinner && <SpinnerFullScreen />}
      <CreatePopup open={isCreateOpen} close={() => setIsCreateOpen(false)} />
    </Container>
  );
};
