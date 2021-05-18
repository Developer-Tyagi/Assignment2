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
  searchString = ''
) {
  dispatch('setLoading', true);
  if (isOnline) {
    try {
      const { data } = await request.get('/leads', { name: searchString });
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
    commit('setOfflineActiveLeads', searchString);
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

export async function addLeads(
  {
    rootState: {
      common: { isOnline }
    },
    dispatch,
    commit
  },
  payload
) {
  dispatch('setLoading', true);
  if (isOnline) {
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
      return true;
    } catch (e) {
      console.log(e);
      dispatch('setLoading', false);
      dispatch('setNotification', {
        type: 'negative',
        message: e.response[0].detail
      });
      return false;
    }
  } else {
    const id = makeId();
    await localDB.activeLeads.add({ ...payload, offline: true, id: id });
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'warning',
      message: 'Lead Created in the local database'
    });
    this.$router.push('/leads');
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
