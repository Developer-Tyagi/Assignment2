export function setLoading(state, value) {
    state.showLoading = value;
}

export function setNotification(state, value) {
    state.notification = value;
}

export function setInspectionTypes(state, inspectionTypes) {
    state.inspectionTypes = inspectionTypes.map(inspectionType => ({...inspectionType.relationships, ...inspectionType.attributes, id: inspectionType.id }));
}