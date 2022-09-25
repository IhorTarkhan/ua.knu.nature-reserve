import React from "react";
import { Link } from "react-router-dom";
import { adminLogin, home } from "../constant/navigation";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={home}>Home</Link>
        </li>
        <li>
          <Link to={adminLogin}>Admin Login</Link>
        </li>
      </ul>
    </nav>
  );
};
