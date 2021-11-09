import request from '@api';
import { buildApiData } from '@utils/api';

export async function getInspectionTypes(
  {
    rootState: {
      common: { isOnline }
    },
    commit,
    dispatch
  },
  params
) {
  if (isOnline) {
    params == 'hideLoader' ? ' ' : dispatch('setLoading', true);
    try {
      const { data } = await request.get('/inspections');
      commit('setInspectionTypes', data);
      dispatch('setLoading', false);
    } catch (e) {
      console.log(e);
      dispatch('setLoading', false);
      dispatch('setNotification', {
        type: 'negative',
        message: e.response[0].title
      });
    }
  } else {
    commit('setOfflineInspectionTypes');
    dispatch('setLoading', false);
  }
}

export async function addInspectionTypes({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/inspections',
      buildApiData('inspections', payload)
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
