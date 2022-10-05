import * as React from "react";
import { ResponsiveAppBar } from "../component/ResponsiveAppBar";

export const AdminHome = () => {
  const navigation = [
    { label: "Home", location: "/admin/home" },
    { label: "Pricing", location: "/admin/pricing"},
    { label: "Blog", location: "/admin/blog" },
  ];

  return (
    <>
      <ResponsiveAppBar pages={navigation} />
      Admin home
    </>
  );
};
