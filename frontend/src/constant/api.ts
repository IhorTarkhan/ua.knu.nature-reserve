export const api = {
  HOST: "http://localhost:8080",
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
