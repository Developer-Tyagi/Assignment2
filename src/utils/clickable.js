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
  let uri = `${address.houseNumber} ${address.streetAddress} ${address.addressLocality} ${address.addressRegion} ${address.postalCode} ${address.addressCountry}`;
  let addressURI = encodeURI(uri);
  window.open(`https://www.google.com/maps/search/?api=1&query=${addressURI}`);
}
export function sendPhoneNumber(value) {
  let specialChars = '!()-[ ]/{}|:<>?,.';

  for (let i = 0; i < specialChars.length; i++) {
    value = value.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
  }
  return value;
}

export function showPhoneNumber(value) {
  if (value) {
    var number = '';
    for (let i = 0; i < value.length; i++) {
      if (i === 0) {
        number += '(';
      } else if (i == 3) {
        number += ')';
        number += ' ';
      } else if (i == 6) {
        number += '-';
      }
      number += value[i];
    }
    return number;
  }
}
