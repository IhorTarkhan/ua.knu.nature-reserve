import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { navigation } from "../constant/navigation";

export const Navigation = (): ReactElement => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={navigation.home}>Home</Link>
        </li>
        <li>
          <Link to={navigation.admin.login}>Admin Login</Link>
        </li>
      </ul>
    </nav>
  );
};
