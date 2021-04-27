import request from '@api';
import { buildApiData } from 'src/utils/api';
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
      message: e.response[0].title
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
      message: e.response[0].title
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
      message: e.response[0].title
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
      message: e.response[0].title
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
      message: e.response[0].title
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
      message: e.response[0].title
    });
  }
}

export async function getRoles({ commit, dispatch }) {
  console.log('hi');
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
      message: e.response[0].title
    });
  }
}

export async function getFolderDocuments({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/documents');
    commit('setAllDocuments', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
  }
}

export async function createDocuments({ dispatch, state }, formData) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post('/documents', formData);

    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
    return false;
  }
}

export async function createDirectories({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/directories',
      buildApiData('directories', payload)
    );

    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
    return false;
  }
}
