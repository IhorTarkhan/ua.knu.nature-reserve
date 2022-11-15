import * as React from "react";
import { Header } from "../../component/Header";
import { nav } from "../../constant/nav";
import { ReactElement } from "react";

export const OperatorHome = (): ReactElement => {
  const pages = [
    { label: "Home", location: nav.operator.home },
    { label: "In dev", location: "/operator/in-dev" },
  ];

  return (
    <>
      <Header pages={pages} home={nav.operator.home} logout={nav.staff} />
      Operator home
    </>
  );
};
