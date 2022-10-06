import * as React from "react";
import { Header } from "../../component/Header";
import { navigation } from "../../constant/navigation";
import { ReactElement } from "react";

export const ManagerHome = (): ReactElement => {
  const pages = [
    { label: "Home", location: navigation.admin.home },
    { label: "Pricing", location: "/admin/pricing" },
    { label: "Blog", location: "/admin/blog" },
  ];

  return (
    <>
      <Header pages={pages} />
      Manager home
    </>
  );
};
