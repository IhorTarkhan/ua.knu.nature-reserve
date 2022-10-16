import * as React from "react";
import { ReactElement } from "react";
import { api } from "../../constant/api";
import { nav } from "../../constant/nav";
import { ExecutiveLogin } from "../../component/ExecutiveLogin";

export const ManagerLogin = (): ReactElement => {
  return (
    <ExecutiveLogin
      url={api.HOST + api.manager.authorisation.login}
      localStorageKey={"Authorization-Manager"}
      homeRouting={nav.manager.animals}
      label={"Manager"}
    />
  );
};
