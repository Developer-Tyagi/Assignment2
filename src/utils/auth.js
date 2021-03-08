import { LocalStorage } from 'quasar';

const tokenName = 'access_token';
const currentUser = 'current_user';

export function setToken(token) {
  LocalStorage.set(tokenName, token);
}

export function removeToken() {
  LocalStorage.remove(tokenName);
}

export function getToken() {
  return LocalStorage.getItem(tokenName);
}

export function setCurrentUser(user) {
  LocalStorage.set(currentUser, user);
}

export function removeCurrentUser() {
  LocalStorage.remove(currentUser);
}

export function getCurrentUser() {
  return LocalStorage.getItem(currentUser);
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
