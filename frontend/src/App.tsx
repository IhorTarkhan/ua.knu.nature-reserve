import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./page/Hpme";
import { adminLogin, home } from "./constant/navigation";
import { AdminLogin } from "./page/AdminLogin";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={home} element={<Home />} />
        <Route path={adminLogin} element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

