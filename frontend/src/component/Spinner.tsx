import React, { ReactElement } from "react";
import { CircularProgress } from "@mui/material";

export const Spinner = (): ReactElement => {
  return (
    <CircularProgress
      style={{
        display: "flex",
        position: "fixed",
        top: "50%",
        left: "50%",
        marginTop: -20,
        marginLeft: -20,
        color: "#ff7700",
      }}
    />
  );
};
