import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { Header } from "../../component/Header";
import { navigation } from "../../constant/navigation";
import { AdminInfo } from "../../dto/response/AdminInfo";
import { axios } from "../../util/AxiosInterceptor";
import { api } from "../../constant/api";
import { AxiosResponse } from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeyIcon from "@mui/icons-material/Key";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";
import Tooltip from "@mui/material/Tooltip";
import FaceIcon from "@mui/icons-material/Face";

const AdminTableHead = (): ReactElement => {
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ width: "20%" }}>ID</TableCell>
        <TableCell>Username</TableCell>
        <TableCell align={"right"}>Action</TableCell>
      </TableRow>
    </TableHead>
  );
};

export const AdminsList = (): ReactElement => {
  const pages = [
    { label: "Home", location: navigation.admin.home },
    { label: "Pricing", location: "/admin/pricing" },
    { label: "Blog", location: "/admin/blog" },
  ];

  const [currentAdmin, setCurrentAdmin] = useState<AdminInfo | null>(null);
  const [admins, setAdmins] = useState<AdminInfo[]>([]);

  useEffect(() => {
    axios
      .get(api.HOST + api.admin.current)
      .then((r: AxiosResponse<AdminInfo>) => setCurrentAdmin(r.data))
      .catch(alert);
    axios
      .get(api.HOST + api.admin.getAll)
      .then((r: AxiosResponse<AdminInfo[]>) => setAdmins(r.data))
      .catch(alert);
  }, []);

  return (
    <>
      <Header pages={pages} username={currentAdmin?.username} />
      <Container>
        <Typography variant={"h4"} m={2}>
          Admins
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label={"simple table"}>
            <AdminTableHead />
            <TableBody>
              {admins
                .filter((x) => x.active)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell align={"right"}>
                      <Tooltip title={"Reset password"}>
                        <IconButton onClick={() => alert("password")}>
                          <KeyIcon fontSize={"large"} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Deactivate admin"}>
                        <IconButton onClick={() => alert("deactivate")}>
                          <BlockIcon fontSize={"large"} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant={"h4"} m={2}>
          Deactivated admins
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label={"simple table"}>
            <AdminTableHead />
            <TableBody>
              {admins
                .filter((x) => !x.active)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell align={"right"}>
                      <Tooltip title={"Activate admin"}>
                        <IconButton onClick={() => alert("password")}>
                          <FaceIcon fontSize={"large"} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
