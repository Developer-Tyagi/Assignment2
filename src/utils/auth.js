import { LocalStorage } from 'quasar';

const tokenName = 'access_token';
const currentUser = 'current_user';
const fcmToken = 'fcmToken';

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

export function setFCMToken(token) {
  LocalStorage.set(fcmToken, token);
}

export function removeFCMToken() {
  LocalStorage.remove(fcmToken);
}

export function getFCMToken() {
  return LocalStorage.getItem(fcmToken);
}

export function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (getToken()) {
    // if (userIsAllowedToRoute(to)) {
    isAuthenticated = true;
    // } else {
    //   isAuthenticated = false;
    // }
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    next();
  } else {
    next('/login');
  }
}

function userIsAllowedToRoute(route) {
  const userRoles = getCurrentUser().attributes.roles;
  console.log(route.name);
}
