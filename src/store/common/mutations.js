export function setLoading(state, value) {
  state.showLoading = value;
}

export function setNotification(state, value) {
  state.notification = value;
}
export function setTitles(state, title) {
  state.title = title.map(title => ({
    title: title.attributes.title,
    id: title.id
  }));
}
