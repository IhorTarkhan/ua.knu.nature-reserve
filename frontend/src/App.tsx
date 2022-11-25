import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { nav } from "./constant/nav";
import {
  AdminsList,
  ManagersList,
  OperatorsList,
} from "./page/admin/AdminLists";
import { ClientAvailableExcursions } from "./page/client/ClientAvailableExcursions";
import { AdminLogin } from "./page/admin/AdminLogin";
import { ManagerLogin } from "./page/manager/ManagerLogin";
import { ManagerAnimalsScreen } from "./page/manager/ManagerAnimalsScreen";
import { OperatorLogin } from "./page/operator/OperatorLogin";
import { OperatorHome } from "./page/operator/OperatorHome";
import { StaffHome } from "./page/StaffHome";
import { AdminStatistics } from "./page/admin/AdminStatistics";

export const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={nav.home} element={<ClientAvailableExcursions />} />
        <Route path={nav.staff} element={<StaffHome />} />
        <Route path={nav.admin.login} element={<AdminLogin />} />
        <Route path={nav.admin.statistics} element={<AdminStatistics />} />
        <Route path={nav.admin.admins} element={<AdminsList />} />
        <Route path={nav.admin.managers} element={<ManagersList />} />
        <Route path={nav.admin.operators} element={<OperatorsList />} />
        <Route path={nav.manager.login} element={<ManagerLogin />} />
        <Route path={nav.manager.animals} element={<ManagerAnimalsScreen />} />
        <Route path={nav.operator.login} element={<OperatorLogin />} />
        <Route path={nav.operator.home} element={<OperatorHome />} />
      </Routes>
    </BrowserRouter>
  );
};
