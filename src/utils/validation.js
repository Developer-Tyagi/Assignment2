export function validateEmail(mail) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (regex.test(mail)) {
    return true;
  }
  return false;
}

export function validateUrl(url) {
  const regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
  if (regex.test(url)) {
    return true;
  } else {
    return false;
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
  const regex = /^([0-1]?\d|2[0-3]):[0-5]\d$/;
  if (val) {
    if (regex.test(val)) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}
