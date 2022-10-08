import * as React from "react";
import { ReactElement, useEffect, useRef, useState } from "react";
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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

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
  const popupPasswordRef = useRef("popup-password");

  const [currentAdmin, setCurrentAdmin] = useState<AdminInfo | null>(null);
  const [admins, setAdmins] = useState<AdminInfo[]>([]);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContent, setPopupContent] = useState<ReactElement>(<></>);
  const [popupAccept, setPopupAccept] = useState<() => void>(() => {});

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

  const openPopup = () => {
    setIsPopup(true);
  };

  const handleChangeAdminPassword = (admin: AdminInfo) => {
    setPopupTitle(
      `Do you want to change password to admin "${admin.username} (${admin.id})"?`
    );
    setPopupContent(
      <>
        <TextField
          id={"popup-new-password"}
          label={"New password"}
          type={"password"}
          style={{ width: "100%", marginTop: 10 }}
          inputRef={popupPasswordRef}
        />
      </>
    );
    setPopupAccept(() => () => {
      // @ts-ignore
      const newPassword = popupPasswordRef.current.value;
      console.log("newPassword = " + newPassword);
      axios
        .get(api.HOST + api.admin.getAll)
        .then((r: AxiosResponse<AdminInfo[]>) => setAdmins(r.data))
        .catch(alert);
    });
    openPopup();
  };

  const handleDeactivateAdmin = (admin: AdminInfo) => {
    setPopupTitle(
      `Do you want to deactivate admin "${admin.username} (${admin.id})"?`
    );
    setPopupContent(<></>);
    setPopupAccept(() => () => {
      axios
        .get(api.HOST + api.admin.getAll)
        .then((r: AxiosResponse<AdminInfo[]>) => setAdmins(r.data))
        .catch(alert);
    });
    openPopup();
  };

  const handleReactivateAdmin = (admin: AdminInfo) => {
    setPopupTitle(
      `Do you want to reactivate admin "${admin.username} (${admin.id})"?`
    );
    setPopupContent(<></>);
    setPopupAccept(() => () => {
      axios
        .get(api.HOST + api.admin.getAll)
        .then((r: AxiosResponse<AdminInfo[]>) => setAdmins(r.data))
        .catch(alert);
    });
    openPopup();
  };

  const handleRejectPopup = () => {
    setIsPopup(false);
  };

  const handleAcceptPopup = () => {
    setIsPopup(false);
    popupAccept();
  };

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
                        <IconButton
                          onClick={() => handleChangeAdminPassword(row)}
                        >
                          <KeyIcon fontSize={"large"} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Deactivate admin"}>
                        <IconButton onClick={() => handleDeactivateAdmin(row)}>
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
                        <IconButton onClick={() => handleReactivateAdmin(row)}>
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

      <Dialog open={isPopup} onClose={handleRejectPopup}>
        <DialogTitle>{popupTitle}</DialogTitle>
        <DialogContent>{popupContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleRejectPopup}>Reject</Button>
          <Button onClick={handleAcceptPopup} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
