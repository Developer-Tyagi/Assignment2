import request from '@api';
import { buildApiData } from '@utils/api';
import localDB, { getCollection } from '@services/dexie';
import { makeId } from '../leads/actions';
import { constants } from '@utils/constant';
import { date } from 'quasar';

export async function getClients(
  {
    rootState: {
      common: { isOnline }
    },
    commit,
    dispatch
  },
  payload
) {
  dispatch('setLoading', true);

  if (isOnline) {
    try {
      const { data } = await request.get('/clients', {
        status: payload.status,
        name: payload.name
      });
      commit('setClients', data);

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
    commit('setOfflineClients', payload);
    dispatch('setLoading', false);
  }
}

export async function getSingleClientDetails(
  {
    rootState: {
      clients: { clients },
      common: { isOnline }
    },
    commit,
    dispatch
  },
  id
) {
  dispatch('setLoading', true);
  try {
    if (isOnline) {
      const { data } = await request.get(`/clients/${id}`);
      commit('setSelectedEditClient', data);
    } else {
      const data = clients.find(client => {
        return client.id === id;
      });

      commit('setSelectedClientOffline', data);
    }

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

//This API is for Viewing single claim Info

export async function getSingleClaimDetails(
  {
    rootState: {
      claims: { claims },
      common: { isOnline }
    },
    commit,
    dispatch
  },
  id
) {
  dispatch('setLoading', true);
  try {
    if (isOnline) {
      const { data } = await request.get(`/claims/${id}/info`);
      commit('setSelectedSingleClaim', data);
    } else {
      const data = await localDB.claims.toArray();

      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].client.id == id) {
          var demo = data[i];
          break;
        }
      }
      return demo;
    }
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

export async function getSingleClientProperty({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    commit('setSelectedClientId', id);
    const { data } = await request.get(`/clients/${id}/addresses`);
    commit('setSelectedClientProperty', data);
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

export async function getEstimators(
  {
    rootState: {
      common: { isOnline }
    },
    commit,
    dispatch
  },
  params
) {
  dispatch('setLoading', true);
  if (isOnline) {
    try {
      const { data } = await request.get('/users', params);
      commit('setEstimators', data);
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
    commit('setOfflineEstimators', params);
    dispatch('setLoading', false);
  }
}

export async function addClient(
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
    return await dispatch('addClientRemote', payload);
  } else {
    return await dispatch('addClientLocal', payload);
  }
}

export async function addClientRemote({ commit }, payload) {
  try {
    const { data } = await request.post(
      '/clients',
      buildApiData('clients', payload)
    );

    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function addClientLocal({ dispatch }, payload) {
  try {
    let client = {
      ...payload,
      offline: true,
      isCreate: true,
      id: makeId(),
      propertyID: makeId(),
      created: date.formatDate(Date.now(), constants.UTCFORMAT),
      updated: date.formatDate(Date.now(), constants.UTCFORMAT)
    };

    await localDB.clients.add(client);

    return client;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function editClientLocal({ dispatch }, payload) {
  try {
    await localDB.clients
      .where('id')
      .equals(payload.id)
      .modify({
        ...payload.data,
        updated: date.formatDate(Date.now(), constants.UTCFORMAT),
        offline: true,
        id: payload.id
      });

    return payload;
  } catch (e) {
    console.log(e);
  }
}

export async function editClaimLocal({ dispatch }, payload) {
  try {
    await localDB.claims
      .where('id')
      .equals(payload.id)
      .modify({
        ...payload.data,
        updated: date.formatDate(Date.now(), constants.UTCFORMAT),
        offline: true,
        id: payload.id
      });

    dispatch('setNotification', {
      type: 'warning',
      message: 'Claim Updated in the local database'
    });

    this.$router.push('/claims');
    return payload;
  } catch (e) {
    console.log(e);
  }
}
export async function addMultipleTaskToClaim(
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
    return await dispatch('addMultipleTaskRemote', payload);
  } else {
    return await dispatch('addMultipleTaskLocal', payload);
  }
}

export async function editMultipleTaskToClaim({ dispatch }, payload) {
  try {
    await localDB.tasks
      .where('id')
      .equals(payload.id)
      .modify({
        ...payload,
        updated: date.formatDate(Date.now(), constants.UTCFORMAT),
        offline: true,
        id: payload.id
      });

    return payload;
  } catch (e) {
    console.log(e);
  }
}

export async function addMultipleTaskRemote({ dispatch }, payload) {
  try {
    const { data } = await request.post(
      `claims/${payload.id}/batch-tasks`,
      buildApiData('claimtask', { tasks: payload.tasks })
    );
    dispatch('setLoading', false);
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function addMultipleTaskLocal({ dispatch }, payload) {
  try {
    let task = { ...payload, offline: true };
    await localDB.tasks.add(task);
    return task;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function addNotes({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/clients/${payload.id}/notes`,
      buildApiData('clients', payload.notesData)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Notes Added Successfully !'
    });
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

export async function addPropertyAddress({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/clients/${payload.id}/addresses`,
      buildApiData('address', payload.clientData)
    );
    dispatch('setLoading', false);
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
  }
}
export async function editedPropertyAddress({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.put(
      `/clients/${payload.id}/addresses/${payload.propertyId}`,
      buildApiData('addresses', payload.clientData)
    );
    dispatch('setLoading', false);
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
  }
}
export async function deletedPropertyAddress({ commit, dispatch }, payload) {
  dispatch('setLoading', true);
  try {
    await request.del(`/clients/${payload.id}/addresses/${payload.propertyId}`);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Property  Deleted !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Error in deleting Property.'
    });
  }
}

export async function editClient({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/clients/${payload.id}/info`,
      buildApiData('clients', payload.clientData)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Client Info Updated Successfully !'
    });
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to updated client info'
    });
  }
}

export async function addClaim(
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
    return await dispatch('addClaimRemote', payload);
    return;
  } else {
    return await dispatch('addClaimLocal', payload);
  }
}

export async function addClaimRemote({ dispatch, commit }, payload) {
  try {
    const { data } = await request.post(
      '/claims',
      buildApiData('claims', payload)
    );

    dispatch('setLoading', false);
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function addClaimLocal({ dispatch }, payload) {
  try {
    let claim = { ...payload, offline: true, isCreate: true, id: makeId() };
    await localDB.claims.add(claim);
    return claim;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function addEstimator(
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
    return await dispatch('addEstimatorRemote', payload);
  } else {
    return await dispatch('addEstimatorLocal', payload);
  }
}

export async function addEstimatorRemote({ commit, dispatch }, payload) {
  try {
    const { data } = await request.post(
      '/users',
      buildApiData('users', payload)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Estimator Created'
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

export async function addEstimatorLocal({ dispatch }, payload) {
  try {
    let estimator = { ...payload, offline: true, id: makeId() };
    await localDB.estimators.add(estimator);
    dispatch('setNotification', {
      type: 'warning',
      message: 'Estimator created in the local database'
    });
    return estimator;
  } catch (e) {
    console.log(e);
  }
}

export async function getPropertyTypes({
  rootState: {
    common: { isOnline }
  },
  commit,
  dispatch
}) {
  if (isOnline) {
    dispatch('setLoading', true);
    try {
      const { data } = await request.get('/prtypes');
      commit('setPropertyTypes', data);
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
    commit('setOfflinePropertyTypes');
    dispatch('setLoading', false);
  }
}
export async function getPolicyTypes({
  rootState: {
    common: { isOnline }
  },
  commit,
  dispatch
}) {
  if (isOnline) {
    dispatch('setLoading', true);
    try {
      const { data } = await request.get('/ptypes');
      commit('setPolicyTypes', data);
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
    commit('setOfflinePolicyTypes');
    dispatch('setLoading', false);
  }
}

export async function getClaimReasons({
  rootState: {
    common: { isOnline }
  },
  commit,
  dispatch
}) {
  if (isOnline) {
    dispatch('setLoading', true);
    try {
      const { data } = await request.get('/claimreasons');
      commit('setClaimReasons', data);
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
    commit('setOfflineClaimReasons');
    dispatch('setLoading', false);
  }
}

export async function getSeverityClaim({
  rootState: {
    common: { isOnline }
  },
  commit,
  dispatch
}) {
  if (isOnline) {
    dispatch('setLoading', true);
    try {
      const { data } = await request.get('/claimseverities');
      commit('setClaimSeverities', data);
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
    commit('setOfflineClaimSeverities');
    dispatch('setLoading', false);
  }
}

export async function getPolicyCategory({
  rootState: {
    common: { isOnline }
  },
  commit,
  dispatch
}) {
  if (isOnline) {
    dispatch('setLoading', true);
    try {
      const { data } = await request.get('/pcategories');
      commit('setPolicyCategories', data);
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
    commit('setOfflinePolicyCategories');
    dispatch('setLoading', false);
  }
}
export async function deletedClientNote({ commit, dispatch }, payload) {
  dispatch('setLoading', true);
  try {
    await request.del(`/clients/${payload.clientId}/notes/${payload.noteId}`);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Note  Deleted !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Error in deleting note.'
    });
  }
}
export async function editClientNotes({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/clients/${payload.clientId}/notes/${payload.noteId}`,
      buildApiData('clients', payload.data)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Note updated successfully !'
    });
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to update note'
    });
  }
}

export async function updateClaimTimeline({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/claims/${payload.id}/phases/${payload.phase}`,
      buildApiData('clients', payload.data)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Phase updated successfully !'
    });
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to update phase'
    });
  }
}

// API for View Client statistics
export async function getClientStatistics({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/clientstatistics');
    commit('setClientStatistics', data);
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
