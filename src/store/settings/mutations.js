export function setInspectionTypes(state, inspectionTypes) {
  state.inspectionTypes = inspectionTypes.map(inspectionType => ({
    ...inspectionType.attributes,
    id: inspectionType.id
  }));
}
export function setAllUsers(state, Users) {
  state.allUsers = Users.map(allUser => ({
    attributes: allUser.attributes,
    name: allUser.attributes.name,
    id: allUser.id
  }));
}
