import * as React from "react";
import { ReactElement, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { axios } from "../util/AxiosInterceptor";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../dto/request/LoginRequest";
import { JwtResponse } from "../dto/response/JwtResponse";
import { SpinnerFullScreen } from "./SpinnerFullScreen";

interface Props {
  url: string;
  homeRouting: string;
  localStorageKey: string;
  label: string;
}

export const ExecutiveLogin = (props: Props): ReactElement => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSpinner, setIsSpinner] = useState<boolean>(false);

  const handleSubmit = () => {
    const request: LoginRequest = { username, password };
    setIsSpinner(true);
    axios
      .post(props.url, request)
      .then((x: AxiosResponse<JwtResponse>) => {
        localStorage.setItem(props.localStorageKey, x.data.authorization);
        navigate(props.homeRouting);
      })
      .catch(alert)
      .finally(() => setIsSpinner(false));
  };

  return (
    <>
      <Container maxWidth={"xs"}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ margin: 1, backgroundColor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component={"h1"} variant={"h5"}>
            Sign in - {props.label}
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            <TextField
              autoFocus
              required
              fullWidth
              label={"Username"}
              sx={{ marginY: 2 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              required
              fullWidth
              label={"Password"}
              type={"password"}
              sx={{ marginY: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant={"contained"}
              sx={{ marginTop: 1 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      {isSpinner && <SpinnerFullScreen />}
    </>
  );
};
