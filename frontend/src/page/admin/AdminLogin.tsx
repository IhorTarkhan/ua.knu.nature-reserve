import * as React from "react";
import { ReactElement } from "react";
import { api } from "../../constant/api";
import { nav } from "../../constant/nav";
import { ExecutiveLogin } from "../../component/ExecutiveLogin";

export const AdminLogin = (): ReactElement => {
  return (
    <ExecutiveLogin
      url={api.HOST + api.admin.authorisation.login}
      localStorageKey={"Authorization-Admin"}
      homeRouting={nav.admin.admins}
      label={"Admin"}
    />
  );
};
