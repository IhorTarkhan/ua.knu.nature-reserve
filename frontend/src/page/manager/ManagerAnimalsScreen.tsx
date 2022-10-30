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
import { ManagerAnimalResponse } from "../../dto/response/manager/ManagerAnimalResponse";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ImageIcon } from "../../component/ImageIcon";
import SickIcon from "@mui/icons-material/Sick";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { fromFormatDate, toFormatDate } from "../../util/DateUtil";

const pages = [
  { label: "Animals", location: nav.manager.animals },
  { label: "In dev", location: "/in-dev" },
  { label: "In dev 2", location: "/in-dev-2" },
];

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
  row: ManagerAnimalResponse;
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
  const [availableList, setAvailableList] = useState<ManagerAnimalResponse[]>();
  const [sickList, setSickList] = useState<ManagerAnimalResponse[]>();
  const [diedList, setDiedList] = useState<ManagerAnimalResponse[]>();

  const updateAnimals = () => {
    return axios
      .get(api.HOST + api.manager.animals.getAll)
      .then((r: AxiosResponse<ManagerAnimalResponse[]>) => {
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

  const askDate = (row: ManagerAnimalResponse): string | void => {
    const dateString = window.prompt(
      `Animal "${row.nickname}" (with id=${row.id})\n    Enter date in format yyyy-mm-dd`,
      toFormatDate(new Date())
    );
    if (dateString == null) return;

    const parsedDate = fromFormatDate(dateString);
    if (parsedDate == null) return alert("Invalid date");

    return toFormatDate(parsedDate);
  };

  const handleSick = (row: ManagerAnimalResponse) => {
    let date;
    let reason;
    if (!(date = askDate(row))) return;
    if (!(reason = window.prompt(`Enter illness description`))) return;
    console.log("in dev:", date, reason);
  };

  const handleDied = (row: ManagerAnimalResponse) => {
    if (
      !window.confirm(
        `Mark animal "${row.nickname}" (with id=${row.id}) as dead?`
      )
    ) {
      return;
    }
    console.log("in dev:");
  };

  const handleRecover = (row: ManagerAnimalResponse) => {
    let date;
    if (!(date = askDate(row))) return;
    console.log("in dev:", date);
  };

  return (
    <>
      <Header pages={pages} />
      <Container>
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
                        <IconButton onClick={() => handleSick(row)}>
                          <SickIcon fontSize={"large"} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Died"}>
                        <IconButton onClick={() => handleDied(row)}>
                          <ImageIcon src={"/icons/scull.svg"} alt={"die"} />
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
                        <IconButton onClick={() => handleRecover(row)}>
                          <VolunteerActivismIcon fontSize={"large"} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Died"}>
                        <IconButton onClick={() => handleDied(row)}>
                          <ImageIcon src={"/icons/scull.svg"} alt={"die"} />
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
      </Container>

      {isSpinner && <SpinnerFullScreen />}
    </>
  );
};
