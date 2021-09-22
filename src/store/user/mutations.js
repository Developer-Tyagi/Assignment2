export function setPhotoIdKeys(state, photoIdKey) {
  if (photoIdKey.attributes.photoIDAPIKey) {
    state.photoIdKey = {
      photoIdKeyPresent: true
    };
  }
}
