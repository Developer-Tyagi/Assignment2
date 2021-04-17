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
//View a single vendor
export async function getVendorDetails({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/vendors/${id}`);
    commit('setSelectedVendor', data);
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

export async function addVendorPersonnel({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/vendors/${payload.id}/personnel`,
      buildApiData('vendorpersonnel', payload.data)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Personnel added Successfully!'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to update company personnel info'
    });
  }
}

export async function getVendorPersonnel({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/vendors/${id}/personnel`);
    commit('setVendorPersonnel', data);
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
export async function editVendorPersonnel({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/vendors/${payload.id}/personnel/${payload.personnelId}`,
      buildApiData('vendorpersonnel', payload.data)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Personnel  Updated !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to update Personnel'
    });
  }
}
export async function deleteVendorPersonnel({ commit, dispatch }, vendor) {
  dispatch('setLoading', true);
  try {
    await request.del(`/vendors/${vendor.id}/personnel/${vendor.personnelId}`);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Personnel  Deleted !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Error in deleting personnel.'
    });
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
