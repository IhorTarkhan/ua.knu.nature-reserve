import * as React from "react";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Header } from "../../component/Header";
import { nav } from "../../constant/nav";
import { AdminInfoResponse } from "../../dto/response/admin/AdminInfoResponse";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import KeyIcon from "@mui/icons-material/Key";
import BlockIcon from "@mui/icons-material/Block";
import AddIcon from "@mui/icons-material/Add";
import FaceIcon from "@mui/icons-material/Face";
import { SpinnerFullScreen } from "../../component/SpinnerFullScreen";
import { AdminChangePasswordRequest } from "../../dto/request/admin/AdminChangePasswordRequest";
import Box from "@mui/material/Box";
import { CreateNewAdminPopup } from "../../component/admin/CreateNewAdminPopup";
import { CreateAdminRequest } from "../../dto/request/admin/CreateAdminRequest";

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

const pages = [
  { label: "Home", location: nav.admin.admins },
  { label: "Pricing", location: "/admin/pricing" },
  { label: "Blog", location: "/admin/blog" },
];

export const AdminsList = (): ReactElement => {
  const popupPasswordRef = useRef("popup-password");

  const [isSpinner, setIsSpinner] = useState<boolean>(true);
  const [admins, setAdmins] = useState<AdminInfoResponse[]>([]);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContent, setPopupContent] = useState<ReactElement>(<></>);
  const [popupAccept, setPopupAccept] = useState<() => void>(() => {});

  const [createPopup, setCreatePopup] = useState<boolean>(false);

  const updateAdmins = () => {
    return axios
      .get(api.HOST + api.admin.admins.getAll)
      .then((r: AxiosResponse<AdminInfoResponse[]>) => setAdmins(r.data))
      .catch(alert);
  };

  useEffect(() => {
    updateAdmins().finally(() => setIsSpinner(false));
  }, []);

  const openPopup = () => {
    setIsPopup(true);
  };

  const handleChangeAdminPassword = (admin: AdminInfoResponse) => {
    setPopupTitle(
      `Do you want to change password to admin "${admin.username} (${admin.id})"?`
    );
    setPopupContent(
      <TextField
        label={"New password"}
        type={"password"}
        style={{ width: "100%", marginTop: 10 }}
        inputRef={popupPasswordRef}
      />
    );
    setPopupAccept(() => () => {
      // @ts-ignore
      const newPassword = popupPasswordRef.current.value;
      const request: AdminChangePasswordRequest = {
        id: admin.id,
        newPassword: newPassword,
      };
      setIsSpinner(true);
      axios
        .put(api.HOST + api.admin.admins.changePassword, request)
        .then(updateAdmins)
        .catch(alert)
        .finally(() => setIsSpinner(false));
    });
    openPopup();
  };

  const handleDeactivateAdmin = (admin: AdminInfoResponse) => {
    setPopupTitle(
      `Do you want to deactivate admin "${admin.username} (${admin.id})"?`
    );
    setPopupContent(<></>);
    setPopupAccept(() => () => {
      axios
        .put(api.HOST + api.admin.admins.deactivate + admin.id)
        .then(updateAdmins)
        .catch(alert)
        .finally(() => setIsSpinner(false));
    });
    openPopup();
  };

  const handleReactivateAdmin = (admin: AdminInfoResponse) => {
    setPopupTitle(
      `Do you want to reactivate admin "${admin.username} (${admin.id})"?`
    );
    setPopupContent(<></>);
    setPopupAccept(() => () => {
      axios
        .put(api.HOST + api.admin.admins.reactivate + admin.id)
        .then(updateAdmins)
        .catch(alert)
        .finally(() => setIsSpinner(false));
    });
    openPopup();
  };

  const handleCreateAdmin = (admin?: CreateAdminRequest) => {
    if (admin) {
      axios
        .post(api.HOST + api.admin.admins.create, admin)
        .then(updateAdmins)
        .catch(alert)
        .finally(() => setIsSpinner(false));
    }
    setCreatePopup(false);
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
      <Header pages={pages} />
      <Container>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant={"h4"} m={2}>
            Admins
          </Typography>
          <Tooltip title={"Create new Admin"} sx={{ my: "auto" }}>
            <IconButton onClick={() => setCreatePopup(true)}>
              <AddIcon fontSize={"large"} />
            </IconButton>
          </Tooltip>
        </Box>
        <TableContainer component={Paper}>
          <Table>
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

      <CreateNewAdminPopup isPopup={createPopup} close={handleCreateAdmin} />

      {isSpinner && <SpinnerFullScreen />}
    </>
  );
};
