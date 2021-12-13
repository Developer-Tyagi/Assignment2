import request from '@api';
import { buildApiData } from '@utils/api';

// function is used for getting the list of Inspection Type, this function is called both in online and offline mode.

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
  params == 'hideLoader' ? ' ' : dispatch('setLoading', true);
  if (isOnline) {
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
    // for offline mode we fetch the inspection details from the local storage.
    commit('setOfflineInspectionTypes');
    dispatch('setLoading', false);
  }
}

// function is used for adding the new Inspection type.
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
