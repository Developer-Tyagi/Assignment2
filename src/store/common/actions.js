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
// function is used for get the details of client type , this function is used both in online and offline mode.
export async function getClientTypes(
  {
    rootState: {
      common: { isOnline }
    },
    commit,
    dispatch
  },
  params
) {
  params == 'hideLoader' ? '' : dispatch('setLoading', true);

  if (isOnline) {
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

// function is used for getting the list of all user , this function is called both in online and offline mode.
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
  if (isOnline) {
    params == 'hideLoader' ? ' ' : dispatch('setLoading', true);
    try {
      const { data } = await request.get('/users', params);
      commit('setAllUsers', data);
      dispatch('setLoading', false);
      return;
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

// // function is used for getting the list of getContactTypes , this function is called both in online and offline mode.
// export async function getContactTypes(
//   {
//     rootState: {
//       common: { isOnline }
//     },
//     commit,
//     dispatch
//   },
//   params
// ) {
//   if (isOnline) {
//     params == 'hideLoader' ? ' ' : dispatch('setLoading', true);

//     try {
//       const { data } = await request.get('/phonetypes');
//       commit('setContactTypes', data);
//       dispatch('setLoading', false);
//     } catch (e) {
//       console.log(e);
//       dispatch('setLoading', false);
//       dispatch('setNotification', {
//         type: 'negative',
//         message: e.response[0].title
//       });
//     }
//   } else {
//     // for offline mode we called contact type from local storage.
//     commit('setOfflineContactTypes');
//     dispatch('setLoading', false);
//   }
// }

// // function is used for getting the list of  titles , this function is called both in online and offline mode.
// export async function getTitles(
//   {
//     rootState: {
//       common: { isOnline }
//     },
//     commit,
//     dispatch
//   },
//   params
// ) {
//   if (isOnline) {
//     try {
//       params == 'hideLoader' ? ' ' : dispatch('setLoading', true);
//       const { data } = await request.get('/honorifics');
//       commit('setTitles', data);
//       dispatch('setLoading', false);
//     } catch (e) {
//       console.log(e);
//       dispatch('setLoading', false);
//       dispatch('setNotification', {
//         type: 'negative',
//         message: e.response[0].title
//       });
//     }
//   } else {
//     commit('setOfflineTitles');
//     dispatch('setLoading', false);
//   }
// }

// function is used for getting the list of all plans .
export async function getAllPlans({ commit, dispatch }) {
  // dispatch('setLoading', true);
  try {
    const { data } = await request.get('/plans');
    commit('setPlans', data);
    // dispatch('setLoading', false);
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
  }
}

export async function getOrgInvoices({ commit, dispatch }, payload) {
  // dispatch('setLoading', true);
  try {
    const { data, meta } = await request.get(
      `/organizations/invoices?limit=${payload.limit}&startingAfter=${payload.startingAfter}&endingBefore=${payload.endingBefore}`
    );
    // dispatch('setLoading', false);
    let dataObj = {
      data: data,
      meta: meta
    };
    return dataObj;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
  }
}

// function is used for getting the list of roles , this function is called both in online and offline mode.

export async function upgradePlan({ dispatch }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/organizations/upgrade-plan',
      buildApiData('organizations', payload)
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

export async function addAdditionalLicense({ dispatch }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      'organizations/plans',
      buildApiData('organizations', payload)
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

export async function getRoles(
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
    dispatch('setLoading', true);
    try {
      const { data } = await request.get(
        '/config-data?viewAll=true&type=roles'
      );

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
    // this is called in the offline mode.
    commit('setOfflineRoles');
    dispatch('setLoading', false);
  }
}

// function is used for getting the list of permissions.
export async function getPermissions({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(
      '/config-data?viewAll=true&type=permissions'
    );
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

// function is used for getting the list of folder documents.
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

// function is used for get the organisation details.
export async function getOrganization({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/organizations/info');
    commit('setOrganization', data);
    dispatch('setLoading', false);
    return true;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
  }
}

// function is used to add the new document.
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
// API for uploading doc or docx file to server
export async function uploadDocFileToServer({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/templates/${payload.templateMachineValue}/upload`,
      payload.formData
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'template has been uploaded successfully !'
    });
    return data;
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

// function is used for updating the role of the user.
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

// function is used for downloading the reports.
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

// function is used for creating the Directories.
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

// function is used for adding the templates.
export async function addTemplate({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/templates',
      buildApiData('templatetypes', payload)
    );
    dispatch('setNotification', {
      type: 'positive',
      message: 'Template has been generated successfully !'
    });
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

// function is used for updating the templates.
export async function editTemplate({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/templates/${payload.type.machineValue}`,
      buildApiData('templatetypes', payload)
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

// function is used for deleting the templates.
export async function deleteTemplate({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.del(
      `/templates/${payload.type}`,
      buildApiData('templatetypes', payload)
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

// function is used for adding the template type , this function is called both in online and offline mode.
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

// function is used for adding the template in the online mode.
export async function addTemplateRemote({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/config-data',
      buildApiData('config-data', payload)
    );

    dispatch('setLoading', false);
    return true;
  } catch (e) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
    return false;
  }
}

// function is used for adding the template in the offline mode.
export async function addTemplateLocal({ dispatch }, payload) {
  try {
    let template = {
      ...payload,
      offline: true,
      id: makeId(),
      created: date.formatDate(Date.now(), constants.UTCFORMAT),
      updated: date.formatDate(Date.now(), constants.UTCFORMAT)
    };

    await localDB.contractDocument.add(template);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Document has been generated successfully !'
    });
    return template;
  } catch (e) {
    console.log(e);
    dispatch('setNotification', {
      type: 'negative',
      message: 'there is some error occurred while generating the document'
    });
    return false;
  }
}

// function is used for geeting  the template  , this function is called both in online and offline mode.
export async function getAllTemplate(
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
  } else {
    commit('setOfflineTemplates');
    dispatch('setLoading', false);
  }
}

// function is used to check weather the device is online or offline.
export function changeNetworkStatus({ commit, dispatch }, isOnline) {
  commit('setNetworkStatus', isOnline);
  if (isOnline) {
    dispatch('syncLocalDataBase');
  }
}

// function is used for storing the data in the local storage.
export async function storeIdsToLocalStorage(type, old, current) {
  const oldItems = LocalStorage.getItem(type) || [];
  const newItems = { oldId: old, newId: current };
  oldItems.push(newItems);
  LocalStorage.set(type, oldItems);
}

// function is used for getting the carrier in the offline mode.
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

export async function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// function is used for getting the contract document in the offline mode.
export async function syncContractDocument({ dispatch }) {
  let offlineDocuments = await getCollection('contractDocument').toArray();

  offlineDocuments = await offlineDocuments.filter(
    document => document.offline
  );

  if (offlineDocuments.length > 0) {
    const createDocument = offlineDocuments.map(({ offline, ...document }) =>
      dispatch('uploadOfflineDocument', document)
    );
  }
}

// function is used for getting the vendor data in the offline mode.
export async function syncVendors({ dispatch }) {
  let offlineVendors = await getCollection('vendors').toArray();
  offlineVendors = offlineVendors.filter(vendor => vendor.offline);
  if (offlineVendors.length > 0) {
    const createVendors = offlineVendors.map(
      ({ id: localId, offline, ...vendor }) => {
        dispatch('addVendorRemote', vendor).then(res => ({
          ...res,
          localId
        }));
      }
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

// function is used for getting the mortgages data in the offline mode.
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

// function is used for getting the estimator data in the offline mode.
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

// function is used for getting the leads data in the offline mode.
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

// function is used for updating the leads data in the offline mode.
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

// function is used for getting the client data in the offline mode.
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

// function is used for getting the claims data in the offline mode.
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

// function is used for getting the office task data in the offline mode.
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

// function is used for adding the permission.
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

// function is used for getting the template token.
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

// function is used for getting the page access.
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
// API for getting Plan Info
export async function getPlanInfo({ commit, dispatch }, payload) {
  dispatch('setLoading', true);
  try {
    // const plan = payload.plan;
    const params = {
      coupon: payload.coupon,
      trial: payload.trial
    };
    const { data } = await request.get('plans/' + payload.plan, params);
    commit('setPlanInfo', data);
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

// function is used for removing the local storage.
export async function clearLocalStorage() {
  LocalStorage.remove('carrier');
  LocalStorage.remove('vendor');
  LocalStorage.remove('lead');
  LocalStorage.remove('client');
  LocalStorage.remove('property');
  LocalStorage.remove('mortgage');
  LocalStorage.remove('estimator');
  LocalStorage.remove('claim');
  LocalStorage.remove('syncContractDocument');
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
  await dispatch('syncContractDocument');
  await clearLocalStorage();
}

// function is used for getting the paid user details.
export async function getPaidUsers({ commit, dispatch }, params) {
  try {
    params == 'hideLoader' ? ' ' : dispatch('setLoading', true);
    const { data } = await request.get('/users?isPaid=true');

    commit('setPaidUsers', data);
    dispatch('setLoading', false);
  } catch (e) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
  }
}
