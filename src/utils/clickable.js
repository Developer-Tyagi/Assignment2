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
  let uri = `${address.houseNumber} ${address.streetAddress} ${address.addressLocality} ${address.addressRegion} ${address.postalCode} ${address.addressCountry}`
  let addressURI = encodeURI(uri)
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${addressURI}`
  );
}
