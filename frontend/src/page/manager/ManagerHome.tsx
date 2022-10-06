import * as React from "react";
import { ResponsiveAppBar } from "../../component/ResponsiveAppBar";
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
      <ResponsiveAppBar pages={pages} />
      Manager home
    </>
  );
};
