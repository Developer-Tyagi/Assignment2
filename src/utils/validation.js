export function validateEmail(mail) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (regex.test(mail)) {
    return true;
  }
  return false;
}
