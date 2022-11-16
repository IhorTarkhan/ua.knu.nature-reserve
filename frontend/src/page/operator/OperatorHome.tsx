import * as React from "react";
import { ReactElement } from "react";
import { Header } from "../../component/Header";
import { nav } from "../../constant/nav";
import { ExcursionTemplateTable } from "./ExcursionTemplateTable";

export const OperatorHome = (): ReactElement => {
  const pages = [{ label: "Excursions", location: nav.operator.home }];

  return (
    <>
      <Header pages={pages} home={nav.operator.home} logout={nav.staff} />
      <ExcursionTemplateTable />
    </>
  );
};
