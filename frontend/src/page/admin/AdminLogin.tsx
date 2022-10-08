import * as React from "react";
import { ReactElement } from "react";
import { api } from "../../constant/api";
import { adminLocalStorage } from "../../constant/localStorage";
import { navigation } from "../../constant/navigation";
import { ExecutiveLogin } from "../../component/ExecutiveLogin";

export const AdminLogin = (): ReactElement => {
  return (
    <ExecutiveLogin
      url={api.HOST + api.admin.authorisation.login}
      localStorageKey={adminLocalStorage}
      homeRouting={navigation.admin.home}
      label={"Admin"}
    />
  );
};
