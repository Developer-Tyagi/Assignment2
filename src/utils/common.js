import AddressService from '@utils/country';
const addressService = new AddressService();
var states = addressService.getStatesShortName('United States');

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export function toGetStateShortName(state) {
  for (let i = 0; i < states.length; i++) {
    if (state == states[i].name) return states[i].shortCode;
  }
}
export function toCheckAddressData(address) {
  if (
    !address.houseNumber &&
    !address.addressLocality &&
    !address.addressRegion &&
    !address.address1
  ) {
    return false;
  } else return true;
}
export function toCheckPhoneNumber(phoneData) {
  var phoneNumberRepetation = phoneData.length;
  for (let i = 0; i < phoneData.length; i++) {
    if (!phoneData[i].number) {
      phoneNumberRepetation--;
    }
  }
  if (phoneNumberRepetation == 0) return false;
  else return true;
}
