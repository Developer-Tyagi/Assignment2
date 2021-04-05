import request from '@api';
import { buildApiData } from '@utils/api';

export async function getVendors({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/vendors', params);

    commit('setvendors', data);
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

export async function addVendor({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/vendors',
      buildApiData('vendors', payload)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Created !'
    });
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].detail
    });
    return false;
  }
}

export async function getVendorIndustries({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/industries');
    commit('setvendorsIndustries', data);
    dispatch('setLoading', false);
  } catch (e) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
  }
}
