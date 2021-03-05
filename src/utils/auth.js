import { Cookies, LocalStorage } from 'quasar';

const tokenName = 'access_token';
const currentUser = 'current_user';
const tokenSettings = { domain: process.env.DOMAIN || 'localhost' };

export function setToken(token) {
  // Cookies.set(tokenName, token, tokenSettings);
  LocalStorage.set(tokenName, token);
}

export function removeToken() {
  // Cookies.remove(tokenName, tokenSettings);
  LocalStorage.remove(tokenName);
}

export function getToken() {
  // return Cookies.get(tokenName);
  LocalStorage.get(tokenName);
}

export function setCurrentUser(user) {
  // Cookies.set(currentUser, user, tokenSettings);
  LocalStorage.set(currentUser, token);
}

export function removeCurrentUser() {
  // Cookies.remove(currentUser, tokenSettings);
  LocalStorage.remove(currentUser);
}

export function getCurrentUser() {
  // return Cookies.get(currentUser);
  LocalStorage.get(currentUser);
}

export function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (getToken()) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next();
  } else {
    next('/login');
  }
}
