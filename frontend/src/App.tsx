import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { navigation } from "./constant/navigation";
import { Home } from "./page/Hpme";
import { AdminLogin } from "./page/admin/AdminLogin";
import { AdminsList } from "./page/admin/AdminsList";
import { ManagerLogin } from "./page/manager/ManagerLogin";
import { ManagerHome } from "./page/manager/ManagerHome";
import { OperatorLogin } from "./page/operator/OperatorLogin";
import { OperatorHome } from "./page/operator/OperatorHome";

export const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={navigation.home} element={<Home />} />
        <Route path={navigation.admin.login} element={<AdminLogin />} />
        <Route path={navigation.admin.home} element={<AdminsList />} />
        <Route path={navigation.manager.login} element={<ManagerLogin />} />
        <Route path={navigation.manager.home} element={<ManagerHome />} />
        <Route path={navigation.operator.login} element={<OperatorLogin />} />
        <Route path={navigation.operator.home} element={<OperatorHome />} />
      </Routes>
    </BrowserRouter>
  );
};
