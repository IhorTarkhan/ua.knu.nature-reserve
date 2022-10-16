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
