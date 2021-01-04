export function setInspectionTypes(state, inspectionTypes) {
    state.inspectionTypes = inspectionTypes.map(inspectionType => ({...inspectionType.attributes, id: inspectionType.id }));
}