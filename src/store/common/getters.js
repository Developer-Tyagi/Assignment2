export const showLoading = state => state.showLoading;

export const notification = state => state.notification;

export const inspectionTypes = (function(state) {
    return state.inspectionTypes.map(type => type.name)
});