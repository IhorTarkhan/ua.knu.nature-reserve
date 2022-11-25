import * as React from "react";
import { nav } from "../../constant/nav";
import { Header } from "../../component/Header";

export const AdminStatistics = () => {
  const pages = [
    { label: "Admins", location: nav.admin.admins },
    { label: "Managers", location: nav.admin.managers },
    { label: "Operators", location: nav.admin.operators },
    { label: "Statistics", location: nav.admin.statistics },
  ];

  return (
    <>
      <Header pages={pages} home={nav.admin.admins} logout={nav.staff} />
    </>
  );
};
