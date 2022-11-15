import * as React from "react";
import { ReactElement } from "react";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";

interface Props {
  href?: string;
}

export const Logo = (props: Props): ReactElement => {
  return (
    <>
      <AdbIcon sx={{ mr: 1 }} />
      <Typography
        variant={"h6"}
        noWrap
        component={"a"}
        href={props.href || "/"}
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
