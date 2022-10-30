import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { nav } from "../constant/nav";

export const Home = (): ReactElement => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={nav.admin.login}>Admin Login</Link>
          </li>
          <li>
            <Link to={nav.manager.login}>Manager Login</Link>
          </li>
          <li>
            <Link to={nav.operator.login}>Operator Login</Link>
          </li>
        </ul>
      </nav>
      <h2>Home</h2>
    </>
  );
};
