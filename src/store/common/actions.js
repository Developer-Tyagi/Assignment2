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

export async function getPermissions({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/permissions');
    commit('setPermissions', data);
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
export async function setSingleRole({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/users/${payload.id}/roles`,
      buildApiData('users', payload.data)
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
export async function addTemplate({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/templates',
      buildApiData('templatets', payload)
    );

    dispatch('setLoading', false);
    return true;
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
export async function getAllTemplate({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/templates');
    commit('setAllTemplate', data);
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

export async function syncCarriers({ dispatch }) {
  let offlineCarriers = await getCollection('carriers').toArray();
  offlineCarriers = offlineCarriers.filter(carrier => carrier.offline);
  if (offlineCarriers.length > 0) {
    const createCarriers = offlineCarriers.map(({ id, offline, ...carrier }) =>
      dispatch('addCarrierRemote', carrier)
    );

    return Promise.allSettled(createCarriers).then(carriers => {
      carriers.forEach(({ status, value }) => {
        if (status === 'fullfilled') {
          storeIdsToLocalStorage('carrier', id, response.id);
          localDB.carriers
            .where('id')
            .equals(id)
            .modify({ id: response.id, offline: false });
        }
      });
      return true;
    });
  }
}

export async function syncVendors({ dispatch }) {
  let offlineVendors = await getCollection('vendors').toArray();
  offlineVendors = offlineVendors.filter(vendor => vendor.offline);
  if (offlineVendors.length > 0) {
    offlineVendors.forEach(async ({ id, offline, ...vendor }) => {
      const response = await dispatch('addVendorRemote', vendor);
      if (response || response.id) {
        await storeIdsToLocalStorage('vendor', id, response.id);
        localDB.vendors
          .where('id')
          .equals(id)
          .modify({ id: response.id, offline: false });
      }
    });
  }
}

export async function syncMortgages({ dispatch }) {
  let offlineMortgages = await getCollection('mortgages').toArray();
  offlineMortgages = offlineMortgages.filter(mortgage => mortgage.offline);
  if (offlineMortgages.length > 0) {
    offlineMortgages.forEach(async ({ id, offline, ...mortgage }) => {
      const response = await dispatch('addMortgageRemote', mortgage);
      if (response || response.id) {
        await storeIdsToLocalStorage('mortgage', id, response.id);
        localDB.mortgages
          .where('id')
          .equals(id)
          .modify({ id: response.id, offline: false });
      }
    });
  }
}

export async function syncEstimators({ dispatch }) {
  let offlineEstimators = await getCollection('estimators').toArray();
  offlineEstimators = offlineEstimators.filter(estimator => estimator.offline);
  if (offlineEstimators.length > 0) {
    offlineEstimators.forEach(async ({ id, offline, ...estimator }) => {
      const response = await dispatch('addEstimatorRemote', estimators);
      if (response || response.id) {
        await storeIdsToLocalStorage('estimator', id, response.id);
        localDB.estimators
          .where('id')
          .equals(id)
          .modify({ id: response.id, offline: false });
      }
    });
  }
}

export async function syncLeads({ dispatch }) {
  let offlineLeads = await getCollection('activeLeads').toArray();
  offlineLeads = offlineLeads.filter(lead => lead.offline);
  if (offlineLeads.length > 0) {
    offlineLeads.forEach(async ({ id, offline, ...lead }) => {
      if (lead.carrier) {
        const items = LocalStorage.getItem('carrier') || [];
        const index = items.findIndex(item => item.oldId === lead.carrier.id);
        console.log(items, index, lead.carrier.id);
        if (index > -1) {
          lead.carrier.id = items[index].newId;
        }
      }
      if (lead.vendor) {
        const items = LocalStorage.getItem('vendor') || [];
        const index = items.findIndex(item => item.oldId === lead.vendor.id);
        if (index > -1) {
          lead.vendor.id = items[index].newId;
        }
      }
      const response = await dispatch('addLeadRemote', lead);
      if (response || response.id) {
        storeIdsToLocalStorage('lead', id, response.id);
        localDB.activeLeads
          .where('id')
          .equals(id)
          .modify({ id: response.id, offline: false });
      }
    });
  }
}

export async function syncClients({ dispatch }) {
  let offlineClients = await getCollection('clients').toArray();
  offlineClients = offlineClients.filter(client => client.offline);
  offlineClients.forEach(({ id, offline, ...client }) => {
    dispatch('addClientRemote', client).then(response => {
      if (response || response.id) {
        storeIdsToLocalStorage('client', id, response.id);
        storeIdsToLocalStorage('property', id, response.attributes.propertyID);
        localDB.clients
          .where('id')
          .equals(id)
          .modify({ id: response.id, offline: false });
      }
    });
  });
}

export async function syncClaims({ dispatch }) {
  let offlineClaims = await getCollection('claims').toArray();
  offlineClaims = offlineClaims.filter(claim => claim.offline);
  offlineClaims.forEach(({ id, offline, ...claim }) => {
    dispatch('addClaimRemote', claim).then(response => {
      if (response || response.id) {
        const items = LocalStorage.getItem('client') || [];
        const index = items.findIndex(item => item.oldId === claim.client.id);
        if (index > -1) {
          claim.client.id = items[index].newId;
        }
        const propItems = LocalStorage.getItem('property') || [];
        const propIndex = propItems.findIndex(
          item => item.oldId === claim.lossInfo.property.id
        );
        if (index > -1) {
          claim.client.id = propItems[propIndex].newId;
        }
        if (claim.policyInfo.carrier.value) {
          const items = LocalStorage.getItem('carrier') || [];
          const index = items.findIndex(
            item => item.oldId === claim.policyInfo.carrier.id
          );
          if (index > -1) {
            claim.policyInfo.carrier.id = items[index].newId;
          }
        }
        if (claim.mortgageInfo && claim.mortgageInfo.length > 0) {
          const items = LocalStorage.getItem('mortgage') || [];
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
          const items = LocalStorage.getItem('vendor') || [];
          claim.expertInfo.vendors.forEach(vendor => {
            const index = items.findIndex(item => item.oldId === vendor.id);
            if (index > -1) {
              vendor.id = items[index].newId;
            }
          });
        }
        if (claim.estimatingInfo) {
          const items = LocalStorage.getItem('estimator') || [];
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
}

export async function syncOfficeTasks({ dispatch }) {
  let offlineTasks = await getCollection('tasks').toArray();
  offlineTasks = offlineTasks.filter(task => task.offline);
  offlineTasks.forEach(({ id, offline, ...task }) => {
    const items = LocalStorage.getItem('claim') || [];
    const index = items.findIndex(item => item.oldId === task.id);
    if (index > -1) {
      task.id = items[index].newId;
      dispatch('addMultipleTaskRemote', task);
    }
  });
}

export async function setMultiplePermission({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/roles/setpermission',
      buildApiData('roles', payload)
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

export async function getTemplateToken({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    // const { data } = await request.get('/template-tokens');
    const data = {
      links: {
        self: ''
      },
      meta: {
        count: 2
      },
      data: [
        {
          group: 'Claim',
          tokens: [
            {
              name: 'Claim number',
              value: '{{.Claim.Number}}',
              desc: 'Claim number'
            },
            {
              name: 'claim name',
              value: '{{.Client.Name}}',
              desc: 'Client name'
            }
          ]
        },
        {
          group: 'Claim5',
          tokens: [
            {
              name: 'Claim number',
              value: '{{.Claim.Number}}',
              desc: 'Claim number'
            },
            {
              name: 'claim name',
              value: '{{.Client.Name}}',
              desc: 'Client name'
            }
          ]
        },
        {
          group: 'Claim1',
          tokens: [
            {
              name: 'Claim number',
              value: '{{.Claim.Number}}',
              desc: 'Claim number'
            },
            {
              name: 'claim name',
              value: '{{.Client.Name}}',
              desc: 'Client name'
            }
          ]
        },

        {
          group: 'Client2',
          tokens: [
            {
              name: 'clines number',
              value: '{{.Claim.Number}}',
              desc: 'Claim number'
            },
            {
              name: 'client name',
              value: '{{.Client.Name}}',
              desc: 'Client name'
            }
          ]
        }
      ]
    };

    commit('setTemplateToken', data);
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

export async function syncLocalDataBase({ dispatch, state }) {
  await dispatch('syncCarriers');
  await dispatch('syncVendors');
  await dispatch('syncMortgages');
  await dispatch('syncEstimators');
  await dispatch('syncLeads');
  await dispatch('syncClients');
  await dispatch('syncClaims');
  await dispatch('syncOfficeTasks');
}
