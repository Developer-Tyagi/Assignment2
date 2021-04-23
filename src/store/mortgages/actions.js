import request from '@api';
import { buildApiData } from '@utils/api';

export async function getMortgages({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/mortgages', params);
    commit('setMortgages', data);
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
export async function addClaimMortgage({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/mortgages',
      buildApiData('mortgages', payload)
    );
    // commit('setSelectedMortgage');
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Mortgage added Successfully!'
    });
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Mortgage not added, please try again !'
    });
    return false;
  }
}

// View a single Carrier
export async function getMortgageDetails({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/mortgages/${id}`);
    commit('setSelectedMortgage', data);
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
export async function getMortgagePersonnel({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/mortgages/${id}/personnel`);
    commit('setMortgagePersonnel', data);
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
export async function addMortgagePersonnel({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/mortgages/${payload.id}/personnel`,
      buildApiData('mortgages', payload.data)
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
      message: 'failed to add mortgage personnel info'
    });
  }
}
export async function editMortgagePersonnel({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/mortgages/${payload.id}/personnel/${payload.personnelId}`,
      buildApiData('mortgagepersonnel', payload.data)
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
export async function deleteMortgagePersonnel({ commit, dispatch }, vendor) {
  dispatch('setLoading', true);
  try {
    await request.del(
      `/mortgages/${vendor.id}/personnel/${vendor.personnelId}`
    );
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
export async function deleteMortgageInfo({ commit, dispatch }, mortgage) {
  dispatch('setLoading', true);
  try {
    await request.del(`/mortgages/${mortgage.id}`);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Mortgage  Deleted !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Error in deleting mortgage.'
    });
  }
}
export async function editMortgageInfo({ dispatch, state }, mortgage) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/mortgages/${mortgage.id}`,
      buildApiData('mortgagepersonnel', mortgage)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Mortgage Info  Updated !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to update mortgage'
    });
  }
}
