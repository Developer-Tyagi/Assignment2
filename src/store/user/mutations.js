export function setPhotoIdKeys(state, photoIdKey) {
  if (photoIdKey.attributes.photoIDAPIKey) {
    state.photoIdKey = {
      photoIdKeyPresent: true
    };
  }
}
export function setUserNameInProfilePart(state, data) {
  state.user.name = data;
}
export function setCheckGoogleDriveConnect(state, data) {
  state.checkConnection = data;
}
