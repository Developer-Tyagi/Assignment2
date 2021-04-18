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
export function sendMap(address) {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${address.houseNumber}${address.streetAddress}${address.postalCode}${address.addressRegion}`
  );
}
