import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const AdminLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    console.log({
      email: email,
      password: password,
    });
  };

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <Box
        sx={{
          marginTop: 16,
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
  );
};
