import { adminHeader, managerHeader, operatorHeader } from "../constant/header";
import {
  adminLocalStorage,
  managerLocalStorage,
  operatorLocalStorage,
} from "../constant/localStorage";

export const axios = require("axios");

type Request = { headers: any; url: string };

function setToHeaderFrom(req: Request, key: string, header: string) {
  const clientHeader: string | null = localStorage.getItem(key);
  if (clientHeader) {
    req.headers[header] = "Bearer " + clientHeader;
  }
}

axios.interceptors.request.use((req: Request) => {
  setToHeaderFrom(req, adminLocalStorage, adminHeader);
  setToHeaderFrom(req, managerLocalStorage, managerHeader);
  setToHeaderFrom(req, operatorLocalStorage, operatorHeader);
  return req;
});
