import * as React from "react";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";

export const Logo = () => {
  return (
    <>
      <AdbIcon sx={{ mr: 1 }} />
      <Typography
        variant={"h6"}
        noWrap
        component={"a"}
        href={"/"}
        sx={{
          mr: 2,
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>
    </>
  );
};
