import request from '@api';
import { buildApiData } from '@utils/api';
import localDB, { getCollection } from '@services/dexie';
import { makeId } from '../leads/actions';

// function is used for getting the list of mortgages, this function is called both in online and offline mode.
export async function getMortgages(
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
      const { data } = await request.get('/mortgages', params);
      const payloadData = { data: data, params: params };
      commit('setMortgages', payloadData);
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
    commit('setOfflineMortgages', params);
    dispatch('setLoading', false);
  }
}

// function is used for creating new mortgage, this function is called both in online and offline mode.
export async function addClaimMortgage(
  {
    rootState: {
      common: { isOnline }
    },
    dispatch
  },
  payload
) {
  dispatch('setLoading', true);
  if (isOnline) {
    return await dispatch('addMortgageRemote', payload);
  } else {
    return await dispatch('addMortgageLocal', payload);
  }
}

// function is used for creating new  mortgage in the online mode.
export async function addMortgageRemote({ commit, dispatch }, payload) {
  try {
    const { data } = await request.post(
      '/mortgages',
      buildApiData('mortgages', payload)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Mortgages Created'
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

// function is used for creating new mortgage in the offline mode.
export async function addMortgageLocal({ dispatch }, payload) {
  try {
    let mortgage = { ...payload, offline: true, id: makeId() };
    await localDB.mortgages.add(mortgage);
    dispatch('setNotification', {
      type: 'warning',
      message: 'Mortgage created in the local database'
    });
    return mortgage;
  } catch (e) {
    console.log(e);
  }
}

// View a single Mortgage
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

// function is used for getting the mortgage personnel details.
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

// function is used for adding the mortgage personnel details.
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

// function is used for editing the mortgage personnel details.
export async function editMortgagePersonnel({ dispatch }, payload) {
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

// function is used for deleting the mortgage personnel details.
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

// function is used for deleting the mortgage.
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

// function is used for updating  the mortgage  details.
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
//Remove mortgage info for given claim

export async function deleteClaimMortgage({ dispatch }, mortgage) {
  dispatch('setLoading', true);
  try {
    await request.del(
      `/claims/${mortgage.claimID}/mortgages/${mortgage.mortgageID}`
    );
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

//API for Update claim mortgage
export async function updateMortgageInfo({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.put(
      `/claims/${payload.claimID}/mortgages/${payload.mortgageID}`,
      buildApiData('claimmortgage', payload.data)
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

//Remove mortgage info for given claim
export async function deleteClaimMortgageInfo({ commit, dispatch }, mortgage) {
  dispatch('setLoading', true);
  try {
    await request.del(
      `/claims/${mortgage.claimID}/mortgages/${mortgage.mortgageID}`
    );
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
