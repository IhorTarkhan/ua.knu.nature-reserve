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
import AddIcon from "@mui/icons-material/Add";
import { axios } from "../../util/AxiosInterceptor";
import { api } from "../../constant/api";
import { AxiosResponse } from "axios";
import { SpinnerFullScreen } from "../../component/SpinnerFullScreen";
import { AnimalViewInListResponse } from "../../dto/response/manager/AnimalViewInListResponse";
import Typography from "@mui/material/Typography";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import Tooltip from "@mui/material/Tooltip";

const pages = [
  { label: "Animals", location: nav.admin.admins },
  { label: "In dev", location: "/in-dev" },
  { label: "In dev 2", location: "/in-dev" },
];

export const ManagerAnimalsScreen = (): ReactElement => {
  const [isSpinner, setIsSpinner] = useState<boolean>(true);
  const [animals, setAnimals] = useState<AnimalViewInListResponse[]>([]);

  const updateAnimals = () => {
    return axios
      .get(api.HOST + api.manager.animals.getAll)
      .then((r: AxiosResponse<AnimalViewInListResponse[]>) =>
        setAnimals(r.data)
      )
      .catch(alert);
  };

  useEffect(() => {
    updateAnimals().finally(() => setIsSpinner(false));
  }, []);

  return (
    <>
      <Header pages={pages} />
      <Container>
        <Typography variant={"h4"} m={2}>
          Animals
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%" }}>ID</TableCell>
                <TableCell>Nickname</TableCell>
                <TableCell>Lookup</TableCell>
                <TableCell>Behavioral</TableCell>
                <TableCell align={"center"}>Migration</TableCell>
                <TableCell align={"center"}>Alive</TableCell>
                <TableCell align={"center"}>Is illness now</TableCell>
                <TableCell align={"center"}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animals.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ width: "20%" }}>{row.id}</TableCell>
                  <TableCell>{row.nickname}</TableCell>
                  <TableCell>{row.lookup}</TableCell>
                  <TableCell>{row.behavioral}</TableCell>
                  <TableCell align={"center"}>
                    {row.migration ? <AddIcon /> : <RemoveIcon />}
                  </TableCell>
                  <TableCell align={"center"}>
                    {row.alive ? <AddIcon /> : <RemoveIcon />}
                  </TableCell>
                  <TableCell align={"center"}>
                    {row.illnessNow ? <AddIcon /> : <RemoveIcon />}
                  </TableCell>
                  <TableCell align={"center"}>
                    <Tooltip title={"Got sick"}>
                      <IconButton
                        onClick={() => alert(1)}
                        disabled={row.illnessNow}
                      >
                        <CoronavirusIcon fontSize={"large"} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Died"}>
                      <IconButton onClick={() => alert(2)}>
                        <MilitaryTechIcon fontSize={"large"} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Disable"}>
                      <IconButton onClick={() => alert(3)}>
                        <DoNotDisturbIcon fontSize={"large"} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {isSpinner && <SpinnerFullScreen />}
    </>
  );
};
