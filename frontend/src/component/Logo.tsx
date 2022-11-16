import * as React from "react";
import { ReactElement } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  href?: string;
}

export const Logo = (props: Props): ReactElement => {
  return (
    <>
      <Box sx={{ m: { xs: 1, md: 2 }, height: { xs: "40px", md: "80px" } }}>
        <img src={"/logo.jpg"} style={{ height: "100%" }} alt={"logo"} />
      </Box>
      <Typography
        noWrap
        component={"a"}
        href={props.href || "/"}
        sx={{
          fontSize: { xs: 18, md: 24 },
          mr: { xs: 1, md: 2 },
          textAlign: "center",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Lorem
        <br />
        Ipsum
      </Typography>
    </>
  );
};
