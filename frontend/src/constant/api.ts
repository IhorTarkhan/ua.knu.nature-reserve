const HOST = "http://localhost:8081";

export const api = {
  admin: {
    authorisation: {
      login: "/login",
      current: "/current",
    },
    admins: {
      getAll: "/",
      changePassword: "/change-password",
      deactivate: "/deactivate/",
      reactivate: "/reactivate/",
      create: "/",
    },
    managers: {
      getAll: "/",
      changePassword: "/change-password",
      deactivate: "/deactivate/",
      reactivate: "/reactivate/",
      create: "/",
    },
    operators: {
      getAll: "/",
      changePassword: "/change-password",
      deactivate: "/deactivate/",
      reactivate: "/reactivate/",
      create: "/",
    },
  },
  manager: {
    authorisation: {
      login: "/login",
      current: "/current",
    },
    animals: {
      getAll: "",
      create: "",
      sick: "/sick",
      recover: "/recover",
      die: "/die/",
    },
  },
  operator: {
    authorisation: {
      login: "/login",
      current: "/current",
    },
    templates: {
      getAll: "",
      create: "",
      planeExcursion: "/excursion",
    },
  },
};

const addRootPrefix = (object: any, prePrefix: string): void => {
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === "string") {
      object[key] = prePrefix + object[key];
    } else {
      addRootPrefix(object[key], prePrefix + "/" + key);
    }
  });
};
addRootPrefix(api, HOST);
