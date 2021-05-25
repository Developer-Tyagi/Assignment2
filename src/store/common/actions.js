import request from '@api';
import { buildApiData } from 'src/utils/api';
import localDB, { getCollection } from '@services/dexie';
import { LocalStorage } from 'quasar';

export function setLoading({ commit }, value) {
  commit('setLoading', value);
}
export async function getClientTypes({
  rootState: {
    common: { isOnline }
  },
  commit,
  dispatch
}) {
  if (isOnline) {
    dispatch('setLoading', true);
    try {
      const { data } = await request.get('/ctypes');
      commit('setClientTypes', data);
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
    commit('setOfflineClientTypes');
    dispatch('setLoading', false);
  }
}

export async function getAllUsers({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/users', params);
    commit('setAllUsers', data);
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

export function setNotification({ commit }, notification) {
  commit('setNotification', notification);
}

export async function getLossCauses({
  rootState: {
    common: { isOnline }
  },
  commit,
  dispatch
}) {
  if (isOnline) {
    dispatch('setLoading', true);
    try {
      const { data } = await request.get('/losscauses');
      commit('setLossCause', data);
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
    commit('setOfflineLossCauses');
    dispatch('setLoading', false);
  }
}
export async function getContactTypes({
  rootState: {
    common: { isOnline }
  },
  commit,
  dispatch
}) {
  if (isOnline) {
    dispatch('setLoading', true);
    try {
      const { data } = await request.get('/phonetypes');
      commit('setContactTypes', data);
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
    commit('setOfflineContactTypes');
    dispatch('setLoading', false);
  }
}

export async function getTitles({
  rootState: {
    common: { isOnline }
  },
  commit,
  dispatch
}) {
  dispatch('setLoading', true);
  if (isOnline) {
    try {
      const { data } = await request.get('/honorifics');
      commit('setTitles', data);
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
    commit('setOfflineTitles');
    dispatch('setLoading', false);
  }
}

export async function getPlansInfo({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/plans');
    commit('setPlans', data);
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

export async function getRoles({
  rootState: {
    common: { isOnline }
  },
  commit,
  dispatch
}) {
  if (isOnline) {
    dispatch('setLoading', true);
    try {
      const { data } = await request.get('/roles');
      commit('setRoles', data);
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
    commit('setOfflineRoles');
    dispatch('setLoading', false);
  }
}

export async function getFolderDocuments({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/documents');
    commit('setAllDocuments', data);
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

export async function createDocuments({ dispatch, state }, formData) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post('/documents', formData);

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

export async function createDirectories({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/directories',
      buildApiData('directories', payload)
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

export function changeNetworkStatus({ commit, dispatch }, isOnline) {
  commit('setNetworkStatus', isOnline);
  if (isOnline) {
    dispatch('syncLocalDataBase');
  }
}

export async function storeIdsToLocalStorage(type, old, current) {
  const oldItems = LocalStorage.getItem(type) || [];
  const newItems = { oldId: old, newId: current };
  oldItems.push(newItems);
  LocalStorage.set(type, oldItems);
}

export async function syncLocalDataBase({ dispatch, state }) {
  let offlineCarriers = await getCollection('carriers').toArray();
  offlineCarriers = offlineCarriers.filter(carrier => carrier.offline);
  offlineCarriers.forEach(({ id, offline, ...carrier }) => {
    dispatch('addCarrierRemote', carrier).then(response => {
      if (response || response.id) {
        storeIdsToLocalStorage('carrier', id, response.id);
        localDB.carriers
          .where('id')
          .equals(id)
          .modify({ id: response.id, offline: false });
      }
    });
  });
  let offlineVendors = await getCollection('vendors').toArray();
  offlineVendors = offlineVendors.filter(vendor => vendor.offline);
  offlineVendors.forEach(({ id, offline, ...vendor }) => {
    dispatch('addVendorRemote', vendor).then(response => {
      if (response || response.id) {
        storeIdsToLocalStorage('vendor', id, response.id);
        localDB.vendors
          .where('id')
          .equals(id)
          .modify({ id: response.id, offline: false });
      }
    });
  });
  let offlineLeads = await getCollection('activeLeads').toArray();
  offlineLeads = offlineLeads.filter(lead => lead.offline);
  offlineLeads.forEach(({ id, offline, ...lead }) => {
    if (lead.carrier) {
      const items = LocalStorage.getItem('carrier');
      const index = items.findIndex(item => item.oldId === lead.carrier.id);
      if (index > -1) {
        lead.carrier.id = items[index].newId;
      }
    }
    if (lead.vendor) {
      const items = LocalStorage.getItem('vendor');
      const index = items.findIndex(item => item.oldId === lead.vendor.id);
      if (index > -1) {
        lead.vendor.id = items[index].newId;
      }
    }
    dispatch('addLeadRemote', lead).then(response => {
      if (response || response.id) {
        storeIdsToLocalStorage('lead', id, response.id);
        localDB.activeLeads
          .where('id')
          .equals(id)
          .modify({ id: response.id, offline: false });
      }
    });
  });

  let offlineClients = await getCollection('clients').toArray();
  offlineClients = offlineClients.filter(client => client.offline);
  offlineClients.forEach(({ id, offline, ...client }) => {
    dispatch('addClientRemote', client).then(response => {
      if (response || response.id) {
        storeIdsToLocalStorage('client', id, response.id);
        localDB.clients
          .where('id')
          .equals(id)
          .modify({ id: response.id, offline: false });
      }
    });
  });

  let offlineClaims = await getCollection('claims').toArray();
  offlineClaims = offlineClaims.filter(claim => claim.offline);
  offlineClaims.forEach(({ id, offline, ...claim }) => {
    dispatch('addClaimRemote', claim).then(response => {
      if (response || response.id) {
        const items = LocalStorage.getItem('client');
        const index = items.findIndex(item => item.oldId === claim.client.id);
        if (index > -1) {
          claim.client.id = items[index].newId;
        }
        if (claim.policyInfo.carrier.value) {
          const items = LocalStorage.getItem('carrier');
          const index = items.findIndex(
            item => item.oldId === claim.policyInfo.carrier.id
          );
          if (index > -1) {
            claim.policyInfo.carrier.id = items[index].newId;
          }
        }
        if (claim.mortgageInfo && claim.mortgageInfo.length > 0) {
          const items = LocalStorage.getItem('mortgage');
          claim.mortagageInfo.forEach(mortgage => {
            const index = items.findIndex(item => item.oldId === mortgage.id);
            if (index > -1) {
              mortgage.id = items[index].newId;
            }
          });
        }
        if (
          claim.expertInfo &&
          claim.expertInfo.vendors &&
          claim.expertInfo.vendors.length > 0
        ) {
          const items = LocalStorage.getItem('vendor');
          claim.expertInfo.vendors.forEach(vendor => {
            const index = items.findIndex(item => item.oldId === vendor.id);
            if (index > -1) {
              vendor.id = items[index].newId;
            }
          });
        }
        if (claim.estimatingInfo) {
          const items = LocalStorage.getItem('estimator');
          const index = items.findIndex(
            item => item.oldId === claim.estimatingInfo.estimatorID
          );
          if (index > -1) {
            claim.estimatingInfo.estimatorID = items[index].newId;
          }
        }
        storeIdsToLocalStorage('claim', id, response.id);
        localDB.claims
          .where('id')
          .equals(id)
          .modify({ id: response.id, offline: false });
      }
    });
  });

  let offlineTasks = await getCollection('tasks').toArray();
  offlineTasks = offlineTasks.filter(task => task.offline);
  offlineTasks.forEach(({ id, offline, ...task }) => {
    const items = LocalStorage.getItem('claim');
    const index = items.findIndex(item => item.oldId === task.id);
    if (index > -1) {
      task.id = items[index].newId;
      dispatch('addMultipleTaskRemote', task);
    }
  });
}
