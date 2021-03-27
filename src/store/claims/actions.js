import request from '@api';
import { buildApiData } from '@utils/api';

//API for Getting All Claims
export async function getClaims({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/claims', params);
    commit('setClaims', data);
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

//This API is for getting Loss Info Details
export async function getLossInfo({ commit, dispatch }, id) {
  dispatch('setLoading', true);

  try {
    // const { data } = await request.get(`/claims/${id}/lossinfo`);
    const data = {
      attributes: {
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
        isNewAddress: false,
        lossAddressName: 'Farmhouse 1',
        addressID: '605c5f3dd762a4813d48cd91',
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

        isPPIF: false,
        isNeedPPIF: false,
        hasHomeMortgage: true,
        isEmergency: true
      }
    };
    commit('setLossInfo', data);
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

// This API is for Updating Loss Info

export async function updateLossInfo({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/claims/${payload.id}/lossinfo`,
      buildApiData('claims', payload)
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
