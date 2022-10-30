import * as React from "react";
import { UsersList } from "../../component/admin/UsersList";
import { api } from "../../constant/api";

export const AdminsList = () => (
  <UsersList url={api.admin.admins} title={"admin"} />
);

export const ManagersList = () => (
  <UsersList url={api.admin.managers} title={"manager"} />
);

export const OperatorsList = () => (
  <UsersList url={api.admin.operators} title={"operator"} />
);
