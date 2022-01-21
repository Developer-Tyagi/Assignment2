import request from '@api';
import { buildApiData } from '@utils/api';

// function is used for getting the list of Inspection Type, this function is called both in online and offline mode.

export async function getInspectionTypes(
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
    try {
      const { data } = await request.get('/inspections');
      commit('setInspectionTypes', data);
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
    // for offline mode we fetch the inspection details from the local storage.
    commit('setOfflineInspectionTypes');
    dispatch('setLoading', false);
  }
}

//function used to get all configuration table data
export async function getAllConfigurationTableData(
  { commit, dispatch },
  params
) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(
      `/config-data?viewAll=true&type=${params}`
    );
    if (params == 'inspections') {
      commit('setInspectionTypes', data);
      dispatch('setLoading', false);
    } else if (params == 'honorifics') {
      commit('setTitles', data);
      dispatch('setLoading', false);
    } else if (params == 'honorifics') {
      commit('setTitles', data);
      dispatch('setLoading', false);
    } else if (params == 'industries') {
      commit('setvendorsIndustries', data);
      dispatch('setLoading', false);
    } else if (params == 'phone_types') {
      commit('setContactTypes', data);
      dispatch('setLoading', false);
    } else if (params == 'client_types') {
      commit('setClientTypes', data);
      dispatch('setLoading', false);
    } else if (params == 'policyType') {
      commit('setPolicyTypes', data);
      dispatch('setLoading', false);
    } else if (params == 'policy_categories') {
      commit('setPolicyCategories', data);
      dispatch('setLoading', false);
    } else if (params == 'property_types') {
      commit('setPropertyTypes', data);
      dispatch('setLoading', false);
    } else if (params == 'claim_reasons') {
      commit('setClaimReasons', data);
      dispatch('setLoading', false);
    } else if (params == 'loss_causes') {
      commit('setLossCause', data);
      dispatch('setLoading', false);
    } else if (params == 'claim_severities') {
      commit('setClaimSeverities', data);
      dispatch('setLoading', false);
    } else if (params == 'template_types') {
      commit('setTemplateTypes', data);
      dispatch('setLoading', false);
    }
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

//function used to get all configuration data
export async function getAllConfigurationData({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/config-types');
    commit('setAllConfigurationData', data);
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

// function is used for adding the new Inspection type.
export async function addInspectionTypes({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/inspections',
      buildApiData('inspections', payload)
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
