export const api = {
  HOST: "http://localhost:8081",
  admin: {
    authorisation: {
      login: "/admin/authorisation/login",
      current: "/admin/authorisation/current",
    },
    management: {
      getAll: "/admin/management/",
      changePassword: "/admin/management/change-password",
      deactivate: "/admin/management/deactivate/",
      reactivate: "/admin/management/reactivate/",
      create: "/admin/management/",
    },
  },
  manager: {
    authorisation: {
      login: "/manager/authorisation/login",
    },
  },
  operator: {
    authorisation: {
      login: "/operator/authorisation/login",
    },
  },
};
