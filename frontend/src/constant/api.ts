export const api = {
  HOST: "http://localhost:8081",
  admin: {
    authorisation: {
      login: "/admin/authorisation/login",
      current: "/admin/authorisation/current",
    },
    admins: {
      getAll: "/admin/admins/",
      changePassword: "/admin/admins/change-password",
      deactivate: "/admin/admins/deactivate/",
      reactivate: "/admin/admins/reactivate/",
      create: "/admin/admins/",
    },
    managers: {
      getAll: "/admin/managers/",
      changePassword: "/admin/managers/change-password",
      deactivate: "/admin/managers/deactivate/",
      reactivate: "/admin/managers/reactivate/",
      create: "/admin/managers/",
    },
    operators: {
      getAll: "/admin/operators/",
      changePassword: "/admin/operators/change-password",
      deactivate: "/admin/operators/deactivate/",
      reactivate: "/admin/operators/reactivate/",
      create: "/admin/operators/",
    },
  },
  manager: {
    authorisation: {
      login: "/manager/authorisation/login",
      current: "/manager/authorisation/current",
    },
    animals: {
      getAll: "/manager/animals",
    },
  },
  operator: {
    authorisation: {
      login: "/operator/authorisation/login",
      current: "/operator/authorisation/current",
    },
  },
};
