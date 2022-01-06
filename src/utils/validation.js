import { sendPhoneNumber } from '@utils/clickable';
export function validateEmail(mail) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(mail)) {
    return true;
  }
  return false;
}

// This Function is used for validating the non required mails

export function validateNonRequiredEmail(mail) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (mail) {
    if (regex.test(mail)) {
      return true;
    }
    return false;
  }
  return true;
}
export function validateUrl(url) {
  const regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9 .]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;

  if (url) {
    if (regex.test(url)) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}

export function validateDate(val) {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

  if (val) {
    if (regex.test(val)) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}
export function validateTime(val) {
  const regex = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;
  if (val) {
    if (regex.test(val)) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}
export function successMessage(message) {
  return this.$q.notify({
    type: 'positive',
    message,
    position: 'top'
  });
}
export function errorMessage(message) {
  return this.$q.notify({
    type: 'negative',
    message,
    position: 'top'
  });
}

//non required phone Number field
export function nonRequiredPhoneNumber(val) {
  if (!val || val.length == 0) return true;
  else {
    if (sendPhoneNumber(val).length == 10) return true;
    else return false;
  }
}
// validate text doesnot contain number and special char
export function validateText(text) {
  const regex = /^[a-zA-Z ]*$/;
  if (regex.test(text)) {
    return true;
  }
  return false;
}
// Validate alphanumeric field
export function validateAlphaNumericText(text) {
  const regex = /^[a-zA-Z0-9]*$/;
  if (regex.test(text)) {
    return true;
  }
  return false;
}
