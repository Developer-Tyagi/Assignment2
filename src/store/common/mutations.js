export function setLoading(state, value) {
  state.showLoading = value;
}

export function setNotification(state, value) {
  state.notification = value;
}
export function setTitles(state, titles) {
  state.titles = titles.map(titles => ({
    title: titles.attributes.titles,
    id: titles.id
  }));
}
