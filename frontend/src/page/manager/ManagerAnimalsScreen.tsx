import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { Header } from "../../component/Header";
import { nav } from "../../constant/nav";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { axios } from "../../util/AxiosInterceptor";
import { api } from "../../constant/api";
import { AxiosResponse } from "axios";
import { SpinnerFullScreen } from "../../component/SpinnerFullScreen";
import { AnimalInfoResponse } from "../../dto/response/AnimalInfoResponse";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ImageIcon } from "../../component/ImageIcon";
import SickIcon from "@mui/icons-material/Sick";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { ManagerCreateAnimalRequest } from "../../dto/request/manager/ManagerCreateAnimalRequest";
import { ManagerSickAnimalRequest } from "../../dto/request/manager/ManagerSickAnimalRequest";
import { ManagerRecoverAnimalRequest } from "../../dto/request/manager/ManagerRecoverAnimalRequest";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

const iconButtonStyle = { height: 51, width: 51 };
const pages = [{ label: "Animals", location: nav.manager.animals }];

const ThisTableHead = (props: { withoutActions?: boolean }): ReactElement => (
  <TableHead>
    <TableRow>
      <TableCell style={{ width: "20%" }}>ID</TableCell>
      <TableCell>Nickname</TableCell>
      <TableCell>Lookup</TableCell>
      <TableCell>Behavioral</TableCell>
      <TableCell align={"right"} style={{ width: "15%" }}>
        {props.withoutActions ? "" : "Actions"}
      </TableCell>
    </TableRow>
  </TableHead>
);

interface ThisTableRowProps {
  row: AnimalInfoResponse;
  children?: ReactElement | ReactElement[];
}

const ThisTableRow = ({ row, children }: ThisTableRowProps): ReactElement => (
  <TableRow>
    <TableCell style={{ width: "20%" }}>{row.id}</TableCell>
    <TableCell>{row.nickname}</TableCell>
    <TableCell>{row.lookup}</TableCell>
    <TableCell>{row.behavioral}</TableCell>
    <TableCell align={"right"}>{children}</TableCell>
  </TableRow>
);

const CreatePopup = (props: {
  isPopup: boolean;
  close: () => void;
}): ReactElement => {
  const [nickname, setNickname] = useState<string>("");
  const [lookup, setLookup] = useState<string>("");
  const [behavioral, setBehavioral] = useState<string>("");

  const handleRejectPopup = () => {
    props.close();
  };

  const handleAcceptPopup = () => {
    const request: ManagerCreateAnimalRequest = {
      nickname,
      lookup,
      behavioral,
    };
    axios
      .post(api.manager.animals.create, request)
      .then(props.close)
      .catch(alert);
  };

  return (
    <Dialog open={props.isPopup} onClose={handleRejectPopup}>
      <DialogTitle>Create</DialogTitle>
      <DialogContent>
        <TextField
          label={"Nickname"}
          style={{ width: "100%", marginTop: 10 }}
          value={nickname}
          onChange={(x) => setNickname(x.target.value)}
        />
        <TextField
          multiline
          rows={3}
          label={"Lookup"}
          style={{ width: "100%", marginTop: 10 }}
          value={lookup}
          onChange={(x) => setLookup(x.target.value)}
        />
        <TextField
          multiline
          rows={3}
          label={"Behavioral"}
          style={{ width: "100%", marginTop: 10 }}
          value={behavioral}
          onChange={(x) => setBehavioral(x.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRejectPopup}>Reject</Button>
        <Button onClick={handleAcceptPopup} autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const SickPopup = (props: {
  id?: number;
  isPopup: boolean;
  close: () => void;
}): ReactElement => {
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<Dayjs>(dayjs(new Date()));

  const handleRejectPopup = () => {
    props.close();
  };

  const handleAcceptPopup = () => {
    const date = value.toDate();
    const request: ManagerSickAnimalRequest = {
      id: props.id,
      date: date.toISOString().split("T")[0],
      description,
    };
    axios.put(api.manager.animals.sick, request).then(props.close).catch(alert);
  };

  return (
    <Dialog open={props.isPopup} onClose={handleRejectPopup}>
      <DialogTitle>Make sick</DialogTitle>
      <DialogContent>
        <TextField
          label={"Description"}
          style={{ width: "100%", marginTop: 10 }}
          value={description}
          onChange={(x) => setDescription(x.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            renderInput={(props) => (
              <TextField {...props} style={{ width: "100%", marginTop: 10 }} />
            )}
            label={"Illness date"}
            value={value}
            onChange={(newValue) => setValue(newValue!)}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRejectPopup}>Reject</Button>
        <Button onClick={handleAcceptPopup} autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const RecoverPopup = (props: {
  id?: number;
  isPopup: boolean;
  close: () => void;
}): ReactElement => {
  const [value, setValue] = useState<Dayjs>(dayjs(new Date()));

  const handleRejectPopup = () => {
    props.close();
  };

  const handleAcceptPopup = () => {
    const date = value.toDate();
    const request: ManagerRecoverAnimalRequest = {
      id: props.id,
      date: date.toISOString().split("T")[0],
    };
    axios
      .put(api.manager.animals.recover, request)
      .then(props.close)
      .catch(alert);
  };

  return (
    <Dialog open={props.isPopup} onClose={handleRejectPopup}>
      <DialogTitle>Recover</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            renderInput={(props) => (
              <TextField {...props} style={{ width: "100%", marginTop: 10 }} />
            )}
            label={"Illness date"}
            value={value}
            onChange={(newValue) => setValue(newValue!)}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRejectPopup}>Reject</Button>
        <Button onClick={handleAcceptPopup} autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ManagerAnimalsScreen = (): ReactElement => {
  const [isSpinner, setIsSpinner] = useState<boolean>(true);
  const [availableList, setAvailableList] = useState<AnimalInfoResponse[]>();
  const [sickList, setSickList] = useState<AnimalInfoResponse[]>();
  const [diedList, setDiedList] = useState<AnimalInfoResponse[]>();
  const [createPopup, setCreatePopup] = useState<boolean>(false);
  const [editable, setEditable] = useState<number>();
  const [sick, setSick] = useState<boolean>(false);
  const [recover, setRecover] = useState<boolean>(false);

  const updateAnimals = () => {
    return axios
      .get(api.manager.animals.getAll)
      .then((r: AxiosResponse<AnimalInfoResponse[]>) => {
        let alive = r.data.filter((x) => x.alive);
        setAvailableList(alive.filter((x) => x.healthy));
        setSickList(alive.filter((x) => !x.healthy));
        setDiedList(r.data.filter((x) => !x.alive));
      })
      .catch(alert);
  };

  useEffect(() => {
    updateAnimals().finally(() => setIsSpinner(false));
  }, []);

  const handleSick = (row: AnimalInfoResponse) => {
    setSick(true);
    setEditable(row.id);
  };

  const handleRecover = (row: AnimalInfoResponse) => {
    setRecover(true);
    setEditable(row.id);
  };

  const handleDied = (row: AnimalInfoResponse) => {
    if (
      window.confirm(
        `Mark animal "${row.nickname}" (with id=${row.id}) as dead?`
      )
    ) {
      axios
        .put(api.manager.animals.die + row.id)
        .then(updateAnimals)
        .catch(alert);
    }
  };

  return (
    <>
      <Header pages={pages} home={nav.manager.animals} logout={nav.staff} />
      <Container>
        <>
          <Box display={"flex"} justifyContent={"end"} m={2}>
            <Tooltip title={"Create new"}>
              <IconButton
                onClick={() => {
                  setCreatePopup(true);
                }}
              >
                <AddIcon fontSize={"large"} />
              </IconButton>
            </Tooltip>
          </Box>

          {availableList?.length === 0 || (
            <>
              <Typography variant={"h4"} m={2}>
                Available animals
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <ThisTableHead />
                  <TableBody>
                    {availableList?.map((row) => (
                      <ThisTableRow key={row.id} row={row}>
                        <Tooltip title={"Got sick"}>
                          <IconButton
                            onClick={() => handleSick(row)}
                            style={iconButtonStyle}
                          >
                            <SickIcon fontSize={"large"} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"Died"}>
                          <IconButton
                            onClick={() => handleDied(row)}
                            style={iconButtonStyle}
                          >
                            <ImageIcon src={"/icons/df.png"} alt={"die"} />
                          </IconButton>
                        </Tooltip>
                      </ThisTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {sickList?.length === 0 || (
            <>
              <Typography variant={"h4"} m={2}>
                Sick animals
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <ThisTableHead />
                  <TableBody>
                    {sickList?.map((row) => (
                      <ThisTableRow key={row.id} row={row}>
                        <Tooltip title={"Recover"}>
                          <IconButton
                            onClick={() => handleRecover(row)}
                            style={iconButtonStyle}
                          >
                            <VolunteerActivismIcon fontSize={"large"} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={"Died"}>
                          <IconButton
                            onClick={() => handleDied(row)}
                            style={iconButtonStyle}
                          >
                            <ImageIcon src={"/icons/df.png"} alt={"die"} />
                          </IconButton>
                        </Tooltip>
                      </ThisTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {diedList?.length === 0 || (
            <>
              <Typography variant={"h4"} m={2}>
                Dies animals
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <ThisTableHead withoutActions />
                  <TableBody>
                    {diedList?.map((row) => (
                      <ThisTableRow key={row.id} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      </Container>
      <CreatePopup
        isPopup={createPopup}
        close={() => {
          updateAnimals().then(() => setCreatePopup(false));
        }}
      />
      <SickPopup
        isPopup={sick}
        close={() => {
          updateAnimals().then(() => setSick(false));
        }}
        id={editable}
      />
      <RecoverPopup
        isPopup={recover}
        close={() => {
          updateAnimals().then(() => setRecover(false));
        }}
        id={editable}
      />

      {isSpinner && <SpinnerFullScreen />}
    </>
  );
};
