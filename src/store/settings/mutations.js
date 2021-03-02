export function setInspectionTypes(state, inspectionTypes) {
  state.inspectionTypes = inspectionTypes.map(inspectionType => ({
    ...inspectionType.attributes,
    id: inspectionType.id
  }));
}

export function setAllUsers(state, allUsers) {
  state.allUsers = allUsers.map(allUser => ({
    attributes: allUser.attributes,
    name: allUser.attributes.value,
    id: allUser.id
  }));
}
