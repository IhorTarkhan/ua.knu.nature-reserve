import * as React from "react";
import { useState } from "react";
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
import { HOST } from "../constant/api";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { adminLocalStorage } from "../constant/localStorage";
import { LoginRequest } from "../dto/request/LoginRequest";
import { JwtResponse } from "../dto/response/JwtResponse";
import { adminHome } from "../constant/navigation";
import { SpinnerFullScreen } from "../component/SpinnerFullScreen";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSpinner, setIsSpinner] = useState<boolean>(false);

  const handleSubmit = () => {
    const request: LoginRequest = { email, password };
    setIsSpinner(true);
    axios
      .post(HOST + "admin/login", request)
      .then((x: AxiosResponse<JwtResponse>) => {
        localStorage.setItem(adminLocalStorage, x.data.authorization);
        navigate(adminHome);
      })
      .catch(alert)
      .finally(() => setIsSpinner(false));
  };

  return (
    <>
      <Container component={"main"} maxWidth={"xs"}>
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
            Sign in
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            <TextField
              autoFocus
              required
              fullWidth
              label={"Email Address"}
              sx={{ marginY: 2 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
