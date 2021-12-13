import request from '@api';
import { buildApiData } from '@utils/api';
import localDB from '@services/dexie';
import { date } from 'quasar';
import { constants } from '@utils/constant';

// function is used for getting the list of active leads , this function is called both in online and offline mode.
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
      } else if (!payload.phase) {
        delete payload.phase;
      }
      payload.searchString ? payload.searchString : '';
      const { data } = await request.get('/leads', {
        new: payload.new,
        phase: payload.phase,
        name: payload.searchString
      });

      const payloadData = { data: data, params: payload.searchString };
      commit('setActiveLeads', payloadData);
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
    // this function is called in the offline mode to fetch the active leads details.
    commit('setOfflineActiveLeads', payload);
    dispatch('setLoading', false);
  }
}

// function is used for getting the list of Archived leads , this function is called both in online and offline mode.
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

// function is used for adding the leads in the Archive List.
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

// function is used for adding the Leads in online mode.
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

// function is used for adding the Leads in offline mode.
export async function addLeadLocal({ dispatch }, payload) {
  try {
    await localDB.activeLeads.add({
      ...payload,
      offline: true,
      id: makeId(),
      created: date.formatDate(Date.now(), constants.UTCFORMAT),
      updated: date.formatDate(Date.now(), constants.UTCFORMAT),
      isCreate: true
    });

    dispatch('setNotification', {
      type: 'warning',
      message: 'Lead Created in the local database'
    });
    this.$router.push('/leads');
  } catch (e) {
    console.log(e);
  }
}

// function is used for adding the leads , this function is called both in online and offline mode.
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

// function is used for updating the leads details, this function is called both in online and offline mode.
export async function editLeadDetails(
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
    await dispatch('editLeadRemote', payload);

    return true;
  } else {
    dispatch('editLeadLocal', payload);
  }
}

// function is used for updating the Leads details in offline mode.
export async function editLeadLocal({ dispatch }, payload) {
  try {
    await localDB.activeLeads
      .where('id')
      .equals(payload.id)
      .modify({
        ...payload.data,
        updated: date.formatDate(Date.now(), constants.UTCFORMAT),
        offline: true,
        id: payload.id,
        isEdit: true
      });

    dispatch('setNotification', {
      type: 'warning',
      message: 'Lead Updated in the local database'
    });

    this.$router.push('/leads');
  } catch (e) {
    console.log(e);
  }
}

// function is used for updating the Leads details in online mode.
export async function editLeadRemote({ commit, dispatch }, payload) {
  try {
    const { data } = await request.put(
      `/leads/${payload.id}`,
      buildApiData('leads', payload.isEdit ? payload : payload.data)
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
    return false;
  }
}

// function is used for getting the selected Leads Details.
export async function getLeadDetails(
  {
    rootState: {
      leads: { activeLeads },
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
      const { data } = await request.get(`/leads/${id}`);
      commit('setSelectedLeadOnline', data);
    } else {
      const data = activeLeads.find(lead => {
        return lead.id === id;
      });
      commit('setSelectedLeadOffline', data);
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

// function is used for creating the random id's..
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
