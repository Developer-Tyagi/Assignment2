import request from '@api';
export function setLoading({ commit }, value) {
  commit('setLoading', value);
}
export async function getClientTypes({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/ctypes');
    commit('setClientTypes', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

export async function getAllUsers({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/users', params);
    commit('setUserRoles', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

export function setNotification({ commit }, notification) {
  commit('setNotification', notification);
}
export async function getLossCauses({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/losscauses');
    commit('setLossCause', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}
export async function getContactTypes({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/phonetypes');

    commit('setContactTypes', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

export async function getTitles({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/honorifics');
    commit('setTitles', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

export async function getPlansInfo({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/plans');
    commit('setPlans', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

export async function getRoles({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/roles');
    commit('setRoles', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}
