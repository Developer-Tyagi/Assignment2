import { Cookies } from 'quasar';

const tokenName = 'access_token';
const currentUser = 'current_user';
const tokenSettings = { domain: process.env.DOMAIN || 'localhost' };

export function setToken(token) {
  // Cookies.set(tokenName, token, tokenSettings);
  localStorage.setItem(tokenName, token);
}

export function removeToken() {
  // Cookies.remove(tokenName, tokenSettings);
  localStorage.removeItem(tokenName);
}

export function getToken() {
  // return Cookies.get(tokenName);
  localStorage.getItem(tokenName);
}

export function setCurrentUser(user) {
  // Cookies.set(currentUser, user, tokenSettings);
  localStorage.setItem(currentUser, token);
}

export function removeCurrentUser() {
  // Cookies.remove(currentUser, tokenSettings);
  localStorage.removeItem(currentUser);
}

export function getCurrentUser() {
  // return Cookies.get(currentUser);
  localStorage.getItem(currentUser);
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
