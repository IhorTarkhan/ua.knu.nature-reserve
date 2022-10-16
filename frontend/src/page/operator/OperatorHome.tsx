import * as React from "react";
import { Header } from "../../component/Header";
import { nav } from "../../constant/nav";
import { ReactElement } from "react";

export const OperatorHome = (): ReactElement => {
  const pages = [
    { label: "Home", location: nav.admin.admins },
    { label: "Pricing", location: "/admin/pricing" },
    { label: "Blog", location: "/admin/blog" },
  ];

  return (
    <>
      <Header pages={pages} />
      Operator home
    </>
  );
};
