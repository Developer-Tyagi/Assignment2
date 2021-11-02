import request from '@api';
import { buildApiData } from '@utils/api';
import localDB, { getCollection } from '@services/dexie';
import { makeId } from '../leads/actions';

export async function getCarriers(
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
    try {
      let result = await request.get(`/carriers`, params);
      commit('setCarriers', result);
    } catch (error) {
      dispatch('redirectTo404Page', error);
      if (error.response) {
        dispatch('setToastMessage', {
          type: 'negative',
          caption: 'Status ' + error.response.data.status,
          message: error.response.data.title
        });
      }
    }
  } else {
    commit('setOfflineCarriers', params);
    dispatch('setLoading', false);
  }
}

export async function addCarrier(
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
    return await dispatch('addCarrierRemote', payload);
  } else {
    return await dispatch('addCarrierLocal', payload);
  }
}

export async function addCarrierRemote({ commit, dispatch }, payload) {
  try {
    const { data } = await request.post(
      '/carriers',
      buildApiData('carriers', payload)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Carrier Created'
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

export async function addCarrierLocal({ dispatch }, payload) {
  try {
    let carrier = { ...payload, offline: true, id: makeId() };
    await localDB.carriers.add(carrier);
    dispatch('setNotification', {
      type: 'warning',
      message: 'Carrier created in the local database'
    });
    return carrier;
  } catch (e) {
    console.log(e);
  }
}

//View a single Carrier
export async function getCarrierDetails({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/carriers/${id}`);
    commit('setSelectedCarrier', data);
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
export async function addCarrierPersonnel({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/carriers/${payload.id}/personnel`,
      buildApiData('claimcarrier', payload.data)
    );

    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Personnel added Successfully!'
    });
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to add company personnel info'
    });
  }
}

export async function getCarrierPersonnel({ commit, dispatch }, paramsObject) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(
      `/carriers/${paramsObject.id}/personnel`,
      paramsObject.params
    );
    commit('setCarrierPersonnel', data);
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

export async function editCarrierPersonnel({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/carriers/${payload.id}/personnel/${payload.personnelId}`,
      buildApiData('carrierpersonnel', payload.data)
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
export async function deleteCarrierPersonnel({ commit, dispatch }, vendor) {
  dispatch('setLoading', true);
  try {
    await request.del(`/carriers/${vendor.id}/personnel/${vendor.personnelId}`);
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
export async function deleteCarrierInfo({ commit, dispatch }, carrier) {
  dispatch('setLoading', true);
  try {
    await request.del(`/carriers/${carrier.id}`);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Carrier  Deleted !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Error in deleting carrier.'
    });
  }
}
export async function editCarrierInfo({ dispatch, state }, carrier) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/carriers/${carrier.id}`,
      buildApiData('carriers', carrier)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Carrier info  Updated !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to update carrier'
    });
  }
}
export async function addClaimCarrier({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/claims/${payload.id}/carriers`,
      buildApiData('claimcarrier', payload.data)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Carrier added Successfully!'
    });
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'error'
    });
    return false;
  }
}
export async function getClaimCarrier({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/claims/${id}/carriers`);
    commit('setSelectedClaimCarrier', data);
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
export async function deleteClaimCarrier({ commit, dispatch }, carrier) {
  dispatch('setLoading', true);
  try {
    await request.del(
      `/claims/${carrier.claimID}/carriers/${carrier.carrierID}`
    );
    commit('setSelectedClaimCarrier');
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Carrier  has been deleted successfully !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Error in deleting carrier.'
    });
  }
}

export async function addClaimPersonnel({ dispatch, state }, payload1) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/claims/${payload1.claimID}/carriers/${payload1.carrierID}/personnel`,
      buildApiData('claimcarrier', payload1.data)
    );

    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Personnel added Successfully!'
    });
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'error'
    });
    return false;
  }
}
export async function deleteClaimCarrierPersonnel(
  { commit, dispatch },
  adjustor
) {
  dispatch('setLoading', true);
  try {
    await request.del(
      `/claims/${adjustor.claimID}/carriers/${adjustor.carrierID}/personnel/${adjustor.personnelD}`
    );
    commit('setSelectedClaimCarrier');
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Personnel  has been deleted successfully !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Error in deleting carrier.'
    });
  }
}

// Edit claim personnel info

export async function editCarrierPersonnelToClaim({ dispatch }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/claims/${payload.claimID}/carriers/${payload.carrierID}/personnel/${payload.id}`,
      buildApiData('claimcarrier', payload.data)
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

//View List of Claim Roles

export async function getClaimRoles({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/claimroles');
    commit('setClaimRoles', data);
    dispatch('setLoading', false);
  } catch (e) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
  }
}
