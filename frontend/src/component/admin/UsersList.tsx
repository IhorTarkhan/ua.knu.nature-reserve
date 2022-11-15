import * as React from "react";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Header } from "../Header";
import { nav } from "../../constant/nav";
import { AdminInfoResponse } from "../../dto/response/admin/AdminInfoResponse";
import { axios } from "../../util/AxiosInterceptor";
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
import { SpinnerFullScreen } from "../SpinnerFullScreen";
import { AdminChangePasswordRequest } from "../../dto/request/admin/AdminChangePasswordRequest";
import Box from "@mui/material/Box";
import { CreateNewPopup } from "./CreateNewPopup";
import { CreateAdminRequest } from "../../dto/request/admin/CreateAdminRequest";

const MyTableHead = (): ReactElement => {
  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ width: "20%" }}>Id</TableCell>
        <TableCell>Username</TableCell>
        <TableCell align={"right"}>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

const pages = [
  { label: "Admins", location: nav.admin.admins },
  { label: "Managers", location: nav.admin.managers },
  { label: "Operators", location: nav.admin.operators },
];

interface Props {
  url: {
    getAll: string;
    changePassword: string;
    deactivate: string;
    reactivate: string;
    create: string;
  };
  title: string;
}

export const UsersList = (props: Props): ReactElement => {
  const popupPasswordRef = useRef("popup-password");

  const [isSpinner, setIsSpinner] = useState<boolean>(true);
  const [users, setUsers] = useState<AdminInfoResponse[]>([]);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupContent, setPopupContent] = useState<ReactElement>(<></>);
  const [popupAccept, setPopupAccept] = useState<() => void>(() => {});

  const [createPopup, setCreatePopup] = useState<boolean>(false);

  const updateUsers = () => {
    return axios
      .get(props.url.getAll)
      .then((r: AxiosResponse<AdminInfoResponse[]>) => setUsers(r.data))
      .catch(alert);
  };

  useEffect(() => {
    updateUsers().finally(() => setIsSpinner(false));
  }, []);

  const openPopup = () => {
    setIsPopup(true);
  };

  const handleChangePassword = (user: AdminInfoResponse) => {
    setPopupTitle(
      `Do you want to change password to ${props.title} "${user.username} (${user.id})"?`
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
        id: user.id,
        newPassword: newPassword,
      };
      setIsSpinner(true);
      axios
        .put(props.url.changePassword, request)
        .then(updateUsers)
        .catch(alert)
        .finally(() => setIsSpinner(false));
    });
    openPopup();
  };

  const handleDeactivate = (user: AdminInfoResponse) => {
    setPopupTitle(
      `Do you want to deactivate ${props.title} "${user.username} (${user.id})"?`
    );
    setPopupContent(<></>);
    setPopupAccept(() => () => {
      axios
        .put(props.url.deactivate + user.id)
        .then(updateUsers)
        .catch(alert)
        .finally(() => setIsSpinner(false));
    });
    openPopup();
  };

  const handleReactivate = (user: AdminInfoResponse) => {
    setPopupTitle(
      `Do you want to reactivate ${props.title} "${user.username} (${user.id})"?`
    );
    setPopupContent(<></>);
    setPopupAccept(() => () => {
      axios
        .put(props.url.reactivate + user.id)
        .then(updateUsers)
        .catch(alert)
        .finally(() => setIsSpinner(false));
    });
    openPopup();
  };

  const handleCreate = (user?: CreateAdminRequest) => {
    if (user) {
      axios
        .post(props.url.create, user)
        .then(updateUsers)
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

  const ActiveTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <MyTableHead />
        <TableBody>
          {users
            .filter((x) => x.active)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell align={"right"}>
                  <Tooltip title={"Reset password"}>
                    <span>
                      <IconButton
                        onClick={() => handleChangePassword(row)}
                        disabled={row.id === 1}
                      >
                        <KeyIcon fontSize={"large"} />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title={"Deactivate"}>
                    <span>
                      <IconButton
                        onClick={() => handleDeactivate(row)}
                        disabled={row.id === 1}
                      >
                        <BlockIcon fontSize={"large"} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const DeactivateTable = () => (
    <TableContainer component={Paper}>
      <Table aria-label={"simple table"}>
        <MyTableHead />
        <TableBody>
          {users
            .filter((x) => !x.active)
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell align={"right"}>
                  <Tooltip title={"Reactivate"}>
                    <IconButton onClick={() => handleReactivate(row)}>
                      <FaceIcon fontSize={"large"} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <Header pages={pages} home={nav.admin.admins} logout={nav.staff} />
      <Container>
        <>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant={"h4"} m={2}>
              {props.title.charAt(0).toUpperCase() + props.title.slice(1)}s
            </Typography>
            <Tooltip title={"Create new"} sx={{ my: "auto" }}>
              <IconButton onClick={() => setCreatePopup(true)}>
                <AddIcon fontSize={"large"} />
              </IconButton>
            </Tooltip>
          </Box>
          <ActiveTable />

          {users.filter((x) => !x.active).length === 0 || (
            <>
              <Typography variant={"h4"} m={2}>
                Deactivated
              </Typography>
              <DeactivateTable />
            </>
          )}
        </>
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

      <CreateNewPopup isPopup={createPopup} close={handleCreate} />

      {isSpinner && <SpinnerFullScreen />}
    </>
  );
};
