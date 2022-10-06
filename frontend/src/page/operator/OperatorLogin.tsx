import * as React from "react";
import { ReactElement } from "react";
import { api } from "../../constant/api";
import { operatorLocalStorage } from "../../constant/localStorage";
import { navigation } from "../../constant/navigation";
import { ExecutiveLogin } from "../../component/ExecutiveLogin";

export const OperatorLogin = (): ReactElement => {
  return (
    <ExecutiveLogin
      url={api.HOST + api.operator.login}
      localStorageKey={operatorLocalStorage}
      homeRouting={navigation.operator.home}
      label={"Operator"}
    />
  );
};
