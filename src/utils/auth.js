import { Cookies } from 'quasar';

const tokenName = 'access_token';
const tokenSettings = { domain: process.env.DOMAIN || 'claimguru.local' };

export function setToken(token) {
    // Cookies.set(tokenName, token, tokenSettings);
    localStorage.setItem(tokenName, token)
}

export function removeToken() {
    // Cookies.remove(tokenName, tokenSettings);
    localStorage.removeItem(tokenName)
}

export function getToken() {
    // return Cookies.get(tokenName);
    return localStorage.getItem(tokenName)
}