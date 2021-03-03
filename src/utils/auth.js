import { Cookies } from 'quasar';

const tokenName = 'access_token';
const currentUser = 'current_user';
const tokenSettings = { domain: process.env.DOMAIN || 'localhost' };

export function setToken(token) {
  Cookies.set(tokenName, token, tokenSettings);
}

export function removeToken() {
  Cookies.remove(tokenName, tokenSettings);
}

export function getToken() {
  return Cookies.get(tokenName);
}

export function setCurrentUser(user) {
  Cookies.set(currentUser, user, tokenSettings);
}

export function removeCurrentUser() {
  Cookies.remove(currentUser, tokenSettings);
}

export function getCurrentUser() {
  return Cookies.get(currentUser);
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
