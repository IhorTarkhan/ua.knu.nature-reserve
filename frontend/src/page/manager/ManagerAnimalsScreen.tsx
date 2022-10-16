import * as React from "react";
import { ReactElement } from "react";
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

const pages = [
  { label: "Animals", location: nav.admin.admins },
  { label: "In dev", location: "/in-dev" },
  { label: "In dev", location: "/in-dev" },
];

export const ManagerAnimalsScreen = (): ReactElement => {
  return (
    <>
      <Header pages={pages} />
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "20%" }}>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell align={"right"}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: "20%" }}>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell align={"right"}>Action</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: "20%" }}>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell align={"right"}>Action</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ width: "20%" }}>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell align={"right"}>Action</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
