import * as React from "react";
import { ResponsiveAppBar } from "../../component/ResponsiveAppBar";
import { adminHome } from "../../constant/navigation";

export const AdminHome = () => {
  const navigation = [
    { label: "Home", location: adminHome },
    { label: "Pricing", location: "/admin/pricing" },
    { label: "Blog", location: "/admin/blog" },
  ];

  return (
    <>
      <ResponsiveAppBar pages={navigation} />
      Admin home
    </>
  );
};
