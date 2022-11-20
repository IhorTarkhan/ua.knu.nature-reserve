import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { Header } from "../../component/Header";
import { nav } from "../../constant/nav";
import { OperatorExcursionTemplateResponse } from "../../dto/response/operator/OperatorExcursionTemplateResponse";
import { axios } from "../../util/AxiosInterceptor";
import { api } from "../../constant/api";
import { AxiosResponse } from "axios";
import Container from "@mui/material/Container";
import { isAllAvailable } from "../../util/AnimalUtil";
import Typography from "@mui/material/Typography";
import { toLongFormatDate } from "../../util/DateUtil";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { RegistrationRequest } from "../../dto/request/client/RegistrationRequest";

interface MyDialogProps {
  isOpen: boolean;
  excursionId?: number;
  close: () => void;
}
const MyDialog = (props: MyDialogProps): ReactElement => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleRejectPopup = () => {
    props.close();
  };
  const handleAcceptPopup = () => {
    const request: RegistrationRequest = {
      excursionId: props.excursionId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    };
    axios
      .post(api.client.templates.registration, request)
      .then(props.close)
      .catch(alert);
  };

  return (
    <Dialog open={props.isOpen} onClose={handleRejectPopup}>
      <DialogTitle>Registration</DialogTitle>
      <DialogContent>
        <TextField
          label={"First name"}
          style={{ width: "100%", marginTop: 10 }}
          value={firstName}
          onChange={(x) => setFirstName(x.target.value)}
        />
        <TextField
          label={"Last name"}
          style={{ width: "100%", marginTop: 10 }}
          value={lastName}
          onChange={(x) => setLastName(x.target.value)}
        />
        <TextField
          label={"Email"}
          style={{ width: "100%", marginTop: 10 }}
          value={email}
          onChange={(x) => setEmail(x.target.value)}
        />
        <TextField
          label={"Phone"}
          style={{ width: "100%", marginTop: 10 }}
          value={phone}
          onChange={(x) => setPhone(x.target.value)}
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

export const ClientAvailableExcursions = (): ReactElement => {
  const pages = [{ label: "Excursions", location: nav.home }];
  const [data, setData] = useState<OperatorExcursionTemplateResponse[]>([]);
  const [dialog, setDialog] = useState<boolean>(false);
  const [excursionId, setExcursionId] = useState<number>();

  const fetchData = (): Promise<any> => {
    return axios
      .get(api.client.templates.getAll)
      .then((x: AxiosResponse<OperatorExcursionTemplateResponse[]>) =>
        setData(x.data)
      )
      .catch(alert);
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  return (
    <>
      <Header pages={pages} home={nav.home} />
      <Container>
        {data
          .filter((row) => isAllAvailable(row))
          .filter((row) => row.animals.length !== 0)
          .filter((row) => row.excursions.length !== 0)
          .map((row) => (
            <>
              <Typography variant={"h4"}>{row.title}</Typography>
              <Typography variant={"h5"}>{row.price}$</Typography>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box>
                  {row.animals.map((animal) => (
                    <Tooltip
                      placement={"right"}
                      title={
                        <>
                          <Typography variant={"h6"}>Lookup:</Typography>
                          <Typography>{animal.lookup}</Typography>
                          <br />
                          <Typography variant={"h6"}>Behavioral:</Typography>
                          <Typography>{animal.behavioral}</Typography>
                        </>
                      }
                    >
                      <Typography
                        style={{ width: "fit-content", cursor: "pointer" }}
                        variant={"h6"}
                      >
                        {animal.nickname}
                      </Typography>
                    </Tooltip>
                  ))}
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "fit-content",
                  }}
                >
                  {row.excursions.map((excursion) => (
                    <Button
                      style={{ justifyContent: "left", margin: "5px" }}
                      variant={"contained"}
                      onClick={() => {
                        setDialog(true);
                        setExcursionId(excursion.id);
                      }}
                    >
                      {toLongFormatDate(excursion.time)}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          ))}
        <MyDialog
          isOpen={dialog}
          close={() => setDialog(false)}
          excursionId={excursionId}
        />
      </Container>
    </>
  );
};
