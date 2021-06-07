import request from '@api';
import { buildApiData } from '@utils/api';
import localDB from '@services/dexie';

export async function getActiveLeadsList(
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
      if (!payload.new) {
        delete payload.new;
      } else if (!payload.status) {
        delete payload.status;
      }
      payload.searchString ? payload.searchString : '';
      const { data } = await request.get('/leads', {
        new: payload.new,
        status: payload.status
      });

      commit('setActiveLeads', data);
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
    commit('setOfflineActiveLeads', payload);
    dispatch('setLoading', false);
  }
}

export async function getArchivedLeadsList(
  {
    rootState: {
      common: { isOnline }
    },
    commit,
    dispatch
  },
  searchString
) {
  dispatch('setLoading', true);
  if (isOnline) {
    try {
      const { data } = await request.get('/leads', {
        name: searchString,
        archive: true
      });
      commit('setArchivedLeads', data);
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
    commit('setOfflineArchivedLeads', searchString);
    dispatch('setLoading', false);
  }
}

export async function addLeadToArchiveList({ commit, dispatch }, leadId) {
  dispatch('setLoading', true);
  try {
    await request.del(`/leads/${leadId}`);
    commit('moveActiveToArchive', leadId);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Error in archiving lead.'
    });
  }
}

export async function addLeadRemote({ commit, dispatch }, payload) {
  try {
    const { data } = await request.post(
      '/leads',
      buildApiData('leads', payload)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Lead Created'
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

export async function addLeadLocal({ dispatch }, payload) {
  try {
    await localDB.activeLeads.add({ ...payload, offline: true, id: makeId() });
    dispatch('setNotification', {
      type: 'warning',
      message: 'Lead Created in the local database'
    });
    this.$router.push('/leads');
  } catch (e) {
    console.log(e);
  }
}

export async function addLeads(
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
    await dispatch('addLeadRemote', payload.data);
    return true;
  } else {
    dispatch('addLeadLocal', payload.data);
  }
}

export async function getLeadDetails({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/leads/${id}`);
    commit('setSelectedLead', data);
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

export async function editLeadDetails({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/leads/${payload.id}`,
      buildApiData('claims', payload.data)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Lead Info Updated Successfully!'
    });
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Failed to update Lead Info! please try again !'
    });
  }
}

export function makeId() {
  var result = [];
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 20; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join('');
}
// API for View lead statistics
export async function getLeadStatistics({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/leadstatistics');
    commit('setLeadStatistics', data);
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
