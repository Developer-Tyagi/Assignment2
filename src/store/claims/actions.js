import request from '@api';
import { buildApiData } from '@utils/api';

//API for Getting All Personnel Info
export async function getPersonnelInfo({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/claims/${id}/personnel`);

    commit('setPersonnel', data);
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

// API for Adding Company Personnel
export async function addCompanyPersonnel({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/claims/${payload.id}/personnel`,
      buildApiData('claims', payload.companyData)
    );
    console.log(data, 89);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to update company personnel info'
    });
  }
}
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
