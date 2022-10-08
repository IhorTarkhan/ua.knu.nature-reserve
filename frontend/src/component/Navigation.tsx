import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { navigation } from "../constant/navigation";

export const Navigation = (): ReactElement => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={navigation.admin.login}>Admin Login</Link>
        </li>
        <li>
          <Link to={navigation.manager.login}>Manager Login</Link>
        </li>
        <li>
          <Link to={navigation.operator.login}>Operator Login</Link>
        </li>
      </ul>
    </nav>
  );
};
