import { Cookies } from "quasar";

const tokenName = "access_token";
const tokenSettings = { domain: process.env.DOMAIN || "localhost" };

export function setToken(token) {
  //   Cookies.set(tokenName, token, tokenSettings);
  localStorage.setItem("token", token);
}

export function removeToken() {
  //   Cookies.remove(tokenName, tokenSettings);
  localStorage.removeItem("token");
}

export function getToken() {
  //   return Cookies.get(tokenName);
  return localStorage.getItem("token");
}
