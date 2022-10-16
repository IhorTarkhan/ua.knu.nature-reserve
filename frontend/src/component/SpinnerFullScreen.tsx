import React, { ReactElement } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const SpinnerFullScreen = (): ReactElement => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.33)",
        overflowX: "hidden",
      }}
    >
      <CircularProgress
        style={{
          display: "flex",
          position: "relative",
          top: "50%",
          left: "50%",
          marginTop: "-75px",
          marginLeft: "-75px",
          width: "150px",
          height: "150px",
          color: "#ff7700",
        }}
      />
    </div>
  );
};
