import request from '@api';
import { buildApiData } from '@utils/api';

export async function getClients({ commit, dispatch }, searchString = '') {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/clients', {
      name: searchString
    });
    commit('setClients', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

export async function getSingleClientDetails({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/clients/${id}`);

    commit('setSelectedEditClient', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

//This API is for View single claim

export async function getSingleClaimDetails({ commit, dispatch }, id) {
  dispatch('setLoading', true);
  try {
    // const { data } = await request.get(`/claims/${id}`);
    const data = {
      data: {
        id: '602634d01d975ca6a81bcf60',
        type: 'claims',
        attributes: {
          created: '2021-02-12T07:57:04.172Z',
          updated: '2021-02-12T07:57:04.172Z',
          client: {
            id: '602634952999a5c99b4efd71',
            fname: 'Bose',
            lname: 'jack'
          },
          policyInfo: {
            carrier: {
              id: '243721c8-4f4c-11eb-ae93-0242ac130002',
              value: 'American Azira'
            },
            number: '1234353BA',
            isClaimFiled: true,
            isForcedPlaced: true,
            claimNumber: 'asd121212aasas',
            category: {
              id: '243721c8-4f4c-11eb-ae93-0242ac130002',
              value: 'commercial',
              machineValue: 'commercial'
            },
            type: {
              id: '243721c8-4f4c-11eb-ae93-0242ac130002',
              value: 'Inland Marine',
              machineValue: 'inland_marine'
            },
            effectiveDate: '2020-09-24T11:18:06Z',
            expirationDate: '2020-09-24T11:18:06Z',
            limitCoverage: {
              dwelling: 12.3,
              otherStructure: 12.34,
              content: 12.21,
              lossOfUse: 12.1
            },
            deductibleAmount: 45,
            depreciation: 1234.09,
            declaration: {
              isDeclared: true,
              fileInfo: {
                id: '243721c8-4f4c-11eb-ae93-0242ac130002',
                value: 'policy_declared.pdf'
              }
            },
            priorPayment: 1234.09,
            limitReason: 'reason for limits or denial'
          },
          mortgageInfo: [
            {
              id: '243721c8-4f4c-11eb-ae93-0242ac130002',
              value: 'Mortgage company 1',
              loanNumber: '123232323',
              accountNumber: '232323233',
              isPrimary: true
            },
            {
              id: '243721c8-4f4c-11eb-ae93-0242ac130002',
              value: 'Mortgage company 1',
              loanNumber: '123232323',
              accountNumber: '232323233',
              isPrimary: false
            }
          ],
          lossInfo: {
            address: {
              addressCountry: 'USA',
              addressLocality: 'Mountain View',
              addressRegion: 'California',
              postalCode: '94043',
              streetAddress: '1600 Amphitheatre Pkwy',
              dropBox: {
                info: 'DropBox info',
                isPresent: false
              },
              houseNumber: '1221'
            },
            propertyType: {
              id: '243721c8-4f4c-11eb-ae93-0242ac130002',
              value: 'residential - condo',
              machineValue: 'residential_condo'
            },
            propertyDesc: 'Property description',
            claimReason: {
              id: '243721c8-4f4c-11eb-ae93-0242ac130002',
              value: 'appraisal',
              machineValue: 'appraisal'
            },
            date: '2020-09-24T11:18:06Z',
            cause: {
              id: '243721c8-4f4c-11eb-ae93-0242ac130002',
              value: 'accidental discharge',
              machineValue: 'accidental_discharge'
            },
            deadlineDate: '2020-09-24T11:18:06Z',
            recovDDDate: '2020-09-24T11:18:06Z',
            isFEMA: true,
            emergencyName: 'strong storm',
            desc: 'Loss description',
            isHabitable: true,
            serverity: {
              id: '243721c8-4f4c-11eb-ae93-0242ac130002',
              value: 'Standard',
              machineValue: 'standard'
            },
            isPPDamaged: true,
            isPPIF: true,
            isNeedPPIF: false,
            hasHomeMortgage: true,
            isEmergency: true,
            isOSDamaged: true,
            OSDamageDesc: 'Other structure damage description',
            isSecondClaim: true,
            lossAddressName: 'Addr Name'
          },
          expertInfo: {
            isVendorAssigned: true,
            vendor: {
              id: '243721c8-4f4c-11eb-ae93-0242ac130002',
              value: 'American Azira'
            },
            isInsuredHired: false,
            notes: 'expert notes',
            internalNotes: 'intenral notes'
          }
        }
      }
    };
    console.log(data, 'data in actions');
    commit('setSelectedSingleClaim', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
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
      message: e.response.data.title
    });
  }
}

export async function getEstimators({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/estimators');

    commit('setEstimators', data);

    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

export async function addClient({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/clients',
      buildApiData('clients', payload)
    );
    dispatch('setLoading', false);
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Failed to create Client! please try again !'
    });
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
      message: e.response.data.title
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
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

export async function addClaim({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/clients/${payload.client.id}/claims`,
      buildApiData('claims', payload)
    );
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

export async function addEstimator({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/estimators',
      buildApiData('estimators', payload)
    );
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}

export async function getPropertyTypes({ commit, dispatch }) {
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
      message: e.response.data.title
    });
  }
}
export async function getPolicyTypes({ commit, dispatch }) {
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
      message: e.response.data.title
    });
  }
}

export async function getClaimReasons({ commit, dispatch }) {
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
      message: e.response.data.title
    });
  }
}

export async function getSeverityClaim({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/claimseverities');
    commit('setClaimSeverity', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}
export async function getPolicyCategory({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/pcategories');
    commit('setPolicyCategory', data);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
  }
}
