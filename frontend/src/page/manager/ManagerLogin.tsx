import * as React from "react";
import { ReactElement } from "react";
import { api } from "../../constant/api";
import { managerLocalStorage } from "../../constant/localStorage";
import { navigation } from "../../constant/navigation";
import { ExecutiveLogin } from "../../component/ExecutiveLogin";

export const ManagerLogin = (): ReactElement => {
  return (
    <ExecutiveLogin
      url={api.HOST + api.manager.authorisation.login}
      localStorageKey={managerLocalStorage}
      homeRouting={navigation.manager.home}
      label={"Manager"}
    />
  );
};
