import * as React from "react";
import { ReactElement } from "react";
import { Icon } from "@mui/material";

interface Props {
  src: string;
  alt: string;
}

export const ImageIcon = (props: Props): ReactElement => {
  return (
    <Icon style={{ textAlign: "center" }}>
      <img src={props.src} style={{ height: "100%" }} alt={props.alt} />
    </Icon>
  );
};
