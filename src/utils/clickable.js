export function onEmailClick(email, e) {
  e.stopPropagation();
  if (email) {
    window.open('mailto:' + email);
  }
}
export function onPhoneNumberClick(number, e) {
  e.stopPropagation();
  if (number) {
    window.open('tel:' + number);
  }
}
