import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./page/Hpme";
import { adminHome, adminLogin, home } from "./constant/navigation";
import { AdminLogin } from "./page/admin/AdminLogin";
import { AdminHome } from "./page/admin/AdminHome";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={home} element={<Home />} />
        <Route path={adminLogin} element={<AdminLogin />} />
        <Route path={adminHome} element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
};
