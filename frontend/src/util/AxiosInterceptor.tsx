export const axios = require("axios");

type Request = { headers: any; url: string };

function setAuthorizationHeaderIfNeeded(req: Request, key: string) {
  const path = new URL(req.url).pathname;
  if (path.startsWith(`/${key}`) && path !== `/${key}/authorisation/login`) {
    const value = "Authorization-" + key.charAt(0).toUpperCase() + key.slice(1);
    const clientHeader: string | null = localStorage.getItem(value);
    if (clientHeader) {
      req.headers[value] = "Bearer " + clientHeader;
    }
  }
}

axios.interceptors.request.use((req: Request) => {
  setAuthorizationHeaderIfNeeded(req, "admin");
  setAuthorizationHeaderIfNeeded(req, "manager");
  setAuthorizationHeaderIfNeeded(req, "operator");
  return req;
});
