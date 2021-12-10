import request from '@api';
import { buildApiData } from '@utils/api';
import localDB, { getCollection } from '@services/dexie';
import { makeId } from '../leads/actions';
import { constants } from '@utils/constant';
import { date } from 'quasar';

// function is used to get the list of clients , this is used for both the offline and online mode.
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
    // for the offline mode we used to store the data in the local database.
    commit('setOfflineClients', payload);
    dispatch('setLoading', false);
  }
}

// function is used to get the details of the selected claim.
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
  try {
    if (isOnline) {
      const { data } = await request.get(`/clients/${id}`);
      commit('setSelectedEditClient', data);
    } else {
      const offlineClients = await getCollection('clients').toArray();

      const data = offlineClients.find(client => {
        return client.id === id;
      });

      commit('setSelectedClientOffline', data);
      return data;
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

// function is used to append the property addess to client.
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

// function is used to get the list of estimators.
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
  params.hideLoader == false ? '' : dispatch('setLoading', true);
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

// function is used to add the new client , this is used in both the offline and online mode.
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
//function is used to add the new client in the online mode.
export async function addClientRemote({ commit }, payload) {
  try {
    delete payload.meta;
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

// function is used add the new client in the offline mode.
export async function addClientLocal({ dispatch }, payload) {
  try {
    let client = {
      ...payload,
      offline: true,
      isCreate: true,
      id: makeId(),
      propertyID: makeId(),
      created: date.formatDate(Date.now(), constants.UTCFORMAT),
      updated: date.formatDate(Date.now(), constants.UTCFORMAT),
      meta: {
        totalClaims: '',
        openClaims: ''
      }
    };

    await localDB.clients.add(client);

    return client;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// function is used to update the client info in the offline mode.
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

// function is used to edit the claim in the offline mode.
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

// this function is used to add the task fot the claim , this function is used in both the offline and online mode.
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

// this function is used to update the task details in the offline mode.
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

// this function is used to add the multiple task in the online mode.
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

// this function is used to add the multiple task in the offline mode.
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

// this function is used to add the notes.
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

// function is used to add the address for the client.
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

// function is used to update the address of the client.
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

// function is used to delete the address  property of the client.
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

// function is used to update the client details.
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

// function is used to add the new claim, this is used both in offline and online mode.
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

// function is used to add the new claim in online mode.
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

// function is used to add the new claim in offline mode
export async function addClaimLocal({ dispatch }, payload) {
  try {
    let claim = {
      ...payload,
      offline: true,
      isCreate: true,
      id: makeId(),
      created: date.formatDate(Date.now(), constants.UTCFORMAT),
      updated: date.formatDate(Date.now(), constants.UTCFORMAT)
    };
    await localDB.claims.add(claim);
    return claim;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// function is used to add new estimator, this is used in both online and offline mode.
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

// this function is used to add the new estimator in the online mode.
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

// this function is used to add the new estimator in the offline mode.
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

// this function is used to get the property type, this function is used in both online and offline mode.
export async function getPropertyTypes(
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
    // this method is called in the offline mode to get the property type of the client.
    commit('setOfflinePropertyTypes');
    dispatch('setLoading', false);
  }
}

// this function is used to get the policy type in the online mode.
export async function getPolicyTypes(
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
    // this function is used to get the policy type in the offline mode.
    commit('setOfflinePolicyTypes');
    dispatch('setLoading', false);
  }
}

// function is used to get the claim reason, this function is used to call both in offline and online mode.
export async function getClaimReasons(
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
    // for the offline mode we fetch the claim reason from the local storage.
    commit('setOfflineClaimReasons');
    dispatch('setLoading', false);
  }
}
// function is used to get the list of severity for both in offline and online mode.
export async function getSeverityClaim(
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
      const { data } = await request.get('/severities');
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

// function is used to get the list of policy category.
export async function getPolicyCategory(
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

// function is used to delete the claim notes.
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
// function is used for editing the claim notes.
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

// function is used for updating the claim timeline.
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
