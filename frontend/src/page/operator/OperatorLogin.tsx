import * as React from "react";
import { ReactElement } from "react";
import { api } from "../../constant/api";
import { nav } from "../../constant/nav";
import { ExecutiveLogin } from "../../component/ExecutiveLogin";

export const OperatorLogin = (): ReactElement => {
  return (
    <ExecutiveLogin
      url={api.operator.authorisation.login}
      localStorageKey={"Authorization-Operator"}
      homeRouting={nav.operator.home}
      label={"Operator"}
    />
  );
};
