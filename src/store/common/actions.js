import request from '@api';
import { buildApiData } from 'src/utils/api';
import localDB, { getCollection } from '@services/dexie';
import { LocalStorage } from 'quasar';
import { claim, estimator } from '../claims/getters';
import { makeId } from '../leads/actions';
import { date } from 'quasar';
import { constants } from '@utils/constant';
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

export async function getAllUsers(
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
  } else {
    commit('setOfflineUsers', params);
    dispatch('setLoading', false);
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

export async function getOrganization({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/organizations/info');
    commit('setOrganization', data);
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
export async function getReportDownload({ commit, dispatch }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(
      `/reports?format=${payload.name}&type=${payload.type}`
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
export async function editTemplate({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/templates/${payload.type.machineValue}`,
      buildApiData('templatetypes/', payload)
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

export async function deleteTemplate({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.del(
      `/templates/${payload.type}`,
      buildApiData('templatetypes/', payload)
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
/////////////////////////////

export async function addTemplateType(
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
    return await dispatch('addTemplateRemote', payload);
    return;
  } else {
    return await dispatch('addTemplateLocal', payload);
  }
}

//////////////////////////////
export async function addTemplateRemote({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/templates',
      buildApiData('templates', payload)
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
//////////////////////////////////

export async function addTemplateLocal({ dispatch }, payload) {
  console.log(payload, 'pay');
  try {
    let template = {
      ...payload,
      offline: true,
      isCreate: true,
      id: makeId(),
      created: date.formatDate(Date.now(), constants.UTCFORMAT),
      updated: date.formatDate(Date.now(), constants.UTCFORMAT)
    };
    console.log(template, 'template in action');
    await localDB.contractDocument.add(template);

    return template;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function getAllTemplate({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/templates');
    // const data = [
    //   {
    //     id: '60a09a385b82ce899a38fa98',
    //     type: 'templates',
    //     attributes: {
    //       created: '2021-05-16T04:06:16.265Z',
    //       updated: '2021-05-16T04:06:16.265Z',
    //       value:
    //         '<p>Pharetra egestas cursus etiam ac maecenas rhoncus facilisis accumsan metus. Eget cubilia scelerisque malesuada tristique pellentesque odio libero donec blandit porta urna donec. Molestie sed fames ullamcorper. Ad pretium euismod urna commodo sit proin semper pharetra vivamus tincidunt. Senectus molestie, nisi ac metus proin torquent. Suscipit est facilisis taciti sollicitudin nam. Sit, orci augue.</p><p>Ultrices neque scelerisque semper ac cras ligula lacus aenean dolor fusce ac convallis. Adipiscing cursus maecenas, mus justo suspendisse semper mi dolor torquent nunc augue. Quisque proin fringilla mi. Facilisi conubia feugiat nisi potenti suscipit. Potenti gravida convallis augue per nec litora ullamcorper. Enim eros metus hendrerit. Cursus aliquet condimentum ante cras orci. Mattis velit diam ultricies sit donec molestie quisque blandit imperdiet etiam condimentum integer. Donec?</p>',
    //       machineValue: 'letter_of_contract',
    //       type: {
    //         machineValue: 'letter_of_contract',
    //         value: 'Letter of Contract'
    //       }
    //     }
    //   }
    //   // {
    //   //   id: '60a09a395b82ce899a38fa99',
    //   //   type: 'templates',
    //   //   attributes: {
    //   //     created: '2021-05-16T04:06:17.542Z',
    //   //     updated: '2021-05-16T04:06:17.542Z',
    //   //     value:
    //   //       '<p>Pharetra egestas cursus etiam ac maecenas rhoncus facilisis accumsan metus. Eget cubilia scelerisque malesuada tristique pellentesque odio libero donec blandit porta urna donec. Molestie sed fames ullamcorper. Ad pretium euismod urna commodo sit proin semper pharetra vivamus tincidunt. Senectus molestie, nisi ac metus proin torquent. Suscipit est facilisis taciti sollicitudin nam. Sit, orci augue.</p><p>Ultrices neque scelerisque semper ac cras ligula lacus aenean dolor fusce ac convallis. Adipiscing cursus maecenas, mus justo suspendisse semper mi dolor torquent nunc augue. Quisque proin fringilla mi. Facilisi conubia feugiat nisi potenti suscipit. Potenti gravida convallis augue per nec litora ullamcorper. Enim eros metus hendrerit. Cursus aliquet condimentum ante cras orci. Mattis velit diam ultricies sit donec molestie quisque blandit imperdiet etiam condimentum integer. Donec?</p>',
    //   //     machineValue: 'letter_of_contract',
    //   //     type: {
    //   //       machineValue: 'letter_of_contract',
    //   //       value: 'Letter of Contract'
    //   //     }
    //   //   }
    //   // }
    // ];

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
    const createCarriers = offlineCarriers.map(
      ({ id: localId, offline, ...carrier }) =>
        dispatch('addCarrierRemote', carrier).then(res => ({ ...res, localId }))
    );
    return new Promise((resolve, reject) =>
      Promise.allSettled(createCarriers).then(carriers => {
        const createdCarriers = carriers
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => {
            storeIdsToLocalStorage('carrier', value.localId, value.id);
            return localDB.carriers
              .where('id')
              .equals(value.localId)
              .modify({ id: value.id, offline: false });
          });
        return Promise.allSettled(createdCarriers).then(results => {
          resolve('All');
        });
      })
    );
  }
}

export async function syncVendors({ dispatch }) {
  let offlineVendors = await getCollection('vendors').toArray();
  console.log(offlineVendors, 123);
  offlineVendors = offlineVendors.filter(vendor => vendor.offline);
  if (offlineVendors.length > 0) {
    const createVendors = offlineVendors.map(
      ({ id: localId, offline, ...vendor }) =>
        dispatch('addVendorRemote', vendor).then(res => ({ ...res, localId }))
    );
    return new Promise((resolve, reject) =>
      Promise.allSettled(createVendors).then(vendors => {
        const createdVendors = vendors
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => {
            storeIdsToLocalStorage('vendor', value.localId, value.id);

            return localDB.vendors
              .where('id')
              .equals(value.localId)
              .modify({ id: value.id, offline: false });
          });
        return Promise.allSettled(createdVendors).then(results => {
          resolve('All');
        });
      })
    );
  }
}

export async function syncMortgages({ dispatch }) {
  let offlineMortgages = await getCollection('mortgages').toArray();
  offlineMortgages = offlineMortgages.filter(mortgage => mortgage.offline);
  if (offlineMortgages.length > 0) {
    const createMortgages = offlineMortgages.map(
      ({ id: localId, offline, ...mortgage }) =>
        dispatch('addMortgageRemote', mortgage).then(res => ({
          ...res,
          localId
        }))
    );
    return new Promise((resolve, reject) =>
      Promise.allSettled(createMortgages).then(mortgages => {
        const createdMortgages = mortgages
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value: { id, localId } }) => {
            storeIdsToLocalStorage('mortgage', localId, id);

            return localDB.mortgages
              .where('id')
              .equals(localId)
              .modify({ id, offline: false });
          });
        return Promise.allSettled(createdMortgages).then(results => {
          resolve('All');
        });
      })
    );
  }
}

export async function syncEstimators({ dispatch }) {
  let offlineEstimators = await getCollection('estimators').toArray();
  offlineEstimators = offlineEstimators.filter(estimator => estimator.offline);
  if (offlineEstimators.length > 0) {
    const createEstimators = offlineEstimators.map(
      ({ id: localId, offline, ...estimator }) =>
        dispatch('addEstimatorRemote', estimator).then(res => ({
          ...res,
          localId
        }))
    );
    return new Promise((resolve, reject) =>
      Promise.allSettled(createEstimators).then(estimators => {
        const createdEstimators = estimators
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => {
            storeIdsToLocalStorage('estimator', value.localId, value.id);

            return localDB.estimators
              .where('id')
              .equals(value.localId)
              .modify({ id: value.id, offline: false });
          });
        return Promise.allSettled(createdEstimators).then(results => {
          resolve('All');
        });
      })
    );
  }
}

export async function syncLeads({ dispatch }) {
  let offlineLeads = await getCollection('activeLeads').toArray();
  offlineLeads = offlineLeads.filter(lead => lead.offline && lead.isCreate);

  if (offlineLeads.length > 0) {
    const createLeads = offlineLeads.map(
      ({ id: localId, offline, ...lead }) => {
        lead.id = localId;
        lead.offline = offline;
        if (lead.carrier) {
          const items = LocalStorage.getItem('carrier') || [];
          const index = items.findIndex(item => item.oldId === lead.carrier.id);
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

        return dispatch('addLeadRemote', lead).then(res => ({
          ...res,
          localId
        }));
      }
    );

    return new Promise((resolve, reject) =>
      Promise.allSettled(createLeads).then(leads => {
        const createdLeads = leads
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => {
            storeIdsToLocalStorage('lead', value.localId, value.id);
            return localDB.activeLeads
              .where('id')
              .equals(value.localId)
              .modify({ id: value.id, offline: false });
          });
        return Promise.allSettled(createdLeads).then(results => {
          resolve('All');
        });
      })
    );
  }
}

export async function syncEditedLeads({ dispatch }) {
  let offlineLeads = await getCollection('activeLeads').toArray();
  offlineLeads = offlineLeads.filter(lead => lead.offline);
  if (offlineLeads.length > 0) {
    const createLeads = offlineLeads.map(
      ({ id: localId, offline, ...lead }) => {
        lead.id = localId;
        if (lead.carrier) {
          const items = LocalStorage.getItem('carrier') || [];
          const index = items.findIndex(item => item.oldId === lead.carrier.id);
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
        if (lead.isEdit && !lead.isCreate) {
          return dispatch('editLeadRemote', lead).then(res => ({
            ...res,
            localId
          }));
        }
      }
    );

    return new Promise((resolve, reject) =>
      Promise.allSettled(createLeads).then(leads => {
        const createdLeads = leads
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => {
            storeIdsToLocalStorage('lead', value.localId, value.id);
            return localDB.activeLeads
              .where('id')
              .equals(value.localId)
              .modify({ id: value.id, offline: false });
          });

        return Promise.allSettled(createdLeads).then(results => {
          resolve('All');
        });
      })
    );
  }
}

export async function syncClients({ dispatch }) {
  let offlineClients = await getCollection('clients').toArray();
  offlineClients = offlineClients.filter(client => client.offline);
  if (offlineClients.length > 0) {
    const createClients = offlineClients.map(
      ({ id: localId, propertyID: propId, offline, ...client }) =>
        dispatch('addClientRemote', client).then(res => ({
          ...res,
          localId,
          propId
        }))
    );
    return new Promise((resolve, reject) =>
      Promise.allSettled(createClients).then(clients => {
        const createdClients = clients
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => {
            storeIdsToLocalStorage('client', value.localId, value.id);
            storeIdsToLocalStorage(
              'property',
              value.propId,
              value.attributes.propertyID
            );
            return localDB.clients
              .where('id')
              .equals(value.localId)
              .modify({ id: value.id, offline: false });
          });
        return Promise.allSettled(createdClients).then(results => {
          resolve('All');
        });
      })
    );
  }
}

export async function syncClaims({ dispatch }) {
  let offlineClaims = await getCollection('claims').toArray();

  offlineClaims = offlineClaims.filter(claim => claim.offline);
  if (offlineClaims.length > 0) {
    const createClaims = offlineClaims.map(
      ({ id: localId, offline, ...claim }) => {
        const items = LocalStorage.getItem('client') || [];
        const index = items.findIndex(item => item.oldId === claim.client.id);
        if (index > -1) {
          claim.client.id = items[index].newId;
        }
        const propItems = LocalStorage.getItem('property') || [];
        const propIndex = propItems.findIndex(
          item => item.oldId === claim.lossInfo.property.id
        );
        if (propIndex > -1) {
          claim.lossInfo.property.id = propItems[propIndex].newId;
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
          claim.mortgageInfo.forEach(mortgage => {
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
        return dispatch('addClaimRemote', claim).then(res => ({
          ...res,
          localId
        }));
      }
    );
    return new Promise((resolve, reject) =>
      Promise.allSettled(createClaims).then(claims => {
        const createdClaims = claims
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => {
            storeIdsToLocalStorage('claim', value.localId, value.id);
            return localDB.claims
              .where('id')
              .equals(value.localId)
              .modify({ id: value.id, offline: false });
          });
        return Promise.allSettled(createdClaims).then(results => {
          resolve('All');
        });
      })
    );
  }
}

export async function syncOfficeTasks({ dispatch }) {
  let offlineTasks = await getCollection('tasks').toArray();
  offlineTasks = offlineTasks.filter(task => task.offline);

  if (offlineTasks.length > 0) {
    const createOfficeTasks = offlineTasks.map(
      ({ id: localId, offline, ...task }) => {
        const items = LocalStorage.getItem('claim') || [];

        const index = items.findIndex(item => item.oldId === localId);

        if (index > -1) {
          task.id = items[index].newId;
        }

        dispatch('addMultipleTaskRemote', task).then(res => ({
          ...res,
          localId
        }));
      }
    );
    return new Promise((resolve, reject) =>
      Promise.allSettled(createOfficeTasks).then(tasks => {
        const createdOfficeTasks = tasks
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => {
            storeIdsToLocalStorage('task', value.localId, value.id);
            return localDB.tasks
              .where('id')
              .equals(value.localId)
              .modify({ id: value.id, offline: false });
          });
        return Promise.allSettled(createdOfficeTasks).then(results => {
          resolve('All');
        });
      })
    );
  }
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
    const { data } = await request.get('/template-tokens');
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
export async function getAccess({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/pageaccess');

    commit('setAccess', data);
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

export async function clearLocalStorage() {
  LocalStorage.remove('carrier');
  LocalStorage.remove('vendor');
  LocalStorage.remove('lead');
  LocalStorage.remove('client');
  LocalStorage.remove('property');
  LocalStorage.remove('mortgage');
  LocalStorage.remove('estimator');
  LocalStorage.remove('claim');
}

export async function syncLocalDataBase({ dispatch, state }) {
  await dispatch('syncCarriers');
  await dispatch('syncVendors');
  await dispatch('syncMortgages');
  await dispatch('syncEstimators');
  await dispatch('syncLeads');
  await dispatch('syncEditedLeads');
  await dispatch('syncClients');
  await dispatch('syncClaims');
  await dispatch('syncOfficeTasks');
  await clearLocalStorage();
}
