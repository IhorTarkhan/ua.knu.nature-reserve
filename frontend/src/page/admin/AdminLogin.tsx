import * as React from "react";
import { ReactElement } from "react";
import { api } from "../../constant/api";
import { navigation } from "../../constant/navigation";
import { ExecutiveLogin } from "../../component/ExecutiveLogin";

export const AdminLogin = (): ReactElement => {
  return (
    <ExecutiveLogin
      url={api.HOST + api.admin.authorisation.login}
      localStorageKey={"Authorization-Admin"}
      homeRouting={navigation.admin.home}
      label={"Admin"}
    />
  );
};
