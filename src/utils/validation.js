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
