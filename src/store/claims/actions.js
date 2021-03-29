import request from '@api';
import { buildApiData } from '@utils/api';

//API for Getting All Claims
export async function getClaims({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/claims', params);
    commit('setClaims', data);
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

export async function getLog({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`claims/${id}/logs`);

    commit('setLog', data);
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

export async function addLog({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/claims/${payload.id}/logs`,
      buildApiData('logs', payload.data)
    );

    dispatch('setLoading', false);
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Failed to create Note! please try again !'
    });
  }
}
