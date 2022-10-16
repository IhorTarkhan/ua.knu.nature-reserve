import * as React from "react";
import { ReactElement } from "react";
import { api } from "../../constant/api";
import { navigation } from "../../constant/navigation";
import { ExecutiveLogin } from "../../component/ExecutiveLogin";

export const OperatorLogin = (): ReactElement => {
  return (
    <ExecutiveLogin
      url={api.HOST + api.operator.authorisation.login}
      localStorageKey={"Authorization-Operator"}
      homeRouting={navigation.operator.home}
      label={"Operator"}
    />
  );
};
