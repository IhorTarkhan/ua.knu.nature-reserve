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
import { fromFormatDate, toShortFormatDate } from "../../util/DateUtil";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { ManagerCreateAnimalRequest } from "../../dto/request/manager/ManagerCreateAnimalRequest";
import { ManagerSickAnimalRequest } from "../../dto/request/manager/ManagerSickAnimalRequest";
import { ManagerRecoverAnimalRequest } from "../../dto/request/manager/ManagerRecoverAnimalRequest";

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

export const ManagerAnimalsScreen = (): ReactElement => {
  const [isSpinner, setIsSpinner] = useState<boolean>(true);
  const [availableList, setAvailableList] = useState<AnimalInfoResponse[]>();
  const [sickList, setSickList] = useState<AnimalInfoResponse[]>();
  const [diedList, setDiedList] = useState<AnimalInfoResponse[]>();

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

  const askDate = (row: AnimalInfoResponse): string | void => {
    const dateString = window.prompt(
      `Animal "${row.nickname}" (with id=${row.id})\n    Enter date in format yyyy-mm-dd`,
      toShortFormatDate(new Date())
    );
    if (dateString == null) return;

    const parsedDate = fromFormatDate(dateString);
    if (parsedDate == null) return alert("Invalid date");

    return toShortFormatDate(parsedDate);
  };

  const handleCreate = () => {
    let nickname;
    let lookup;
    let behavioral;
    if (!(nickname = window.prompt(`Enter nickname`))) return;
    if (!(lookup = window.prompt(`Enter lookup`))) return;
    if (!(behavioral = window.prompt(`Enter behavioral`))) return;
    const request: ManagerCreateAnimalRequest = {
      nickname,
      lookup,
      behavioral,
    };
    axios
      .post(api.manager.animals.create, request)
      .then(updateAnimals)
      .catch(alert);
  };

  const handleSick = (row: AnimalInfoResponse) => {
    let date;
    let description;
    if (!(date = askDate(row))) return;
    if (!(description = window.prompt(`Enter illness description`))) return;
    const request: ManagerSickAnimalRequest = {
      id: row.id,
      date,
      description,
    };
    axios
      .put(api.manager.animals.sick, request)
      .then(updateAnimals)
      .catch(alert);
  };

  const handleRecover = (row: AnimalInfoResponse) => {
    let date;
    if (!(date = askDate(row))) return;
    const request: ManagerRecoverAnimalRequest = {
      id: row.id,
      date,
    };
    axios
      .put(api.manager.animals.recover, request)
      .then(updateAnimals)
      .catch(alert);
  };

  const handleDied = (row: AnimalInfoResponse) => {
    if (
      !window.confirm(
        `Mark animal "${row.nickname}" (with id=${row.id}) as dead?`
      )
    ) {
      return;
    }
    axios
      .put(api.manager.animals.die + row.id)
      .then(updateAnimals)
      .catch(alert);
  };

  return (
    <>
      <Header pages={pages} home={nav.manager.animals} logout={nav.staff} />
      <Container>
        <>
          <Box display={"flex"} justifyContent={"end"} m={2}>
            <Tooltip title={"Create new"}>
              <IconButton onClick={handleCreate}>
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

      {isSpinner && <SpinnerFullScreen />}
    </>
  );
};
