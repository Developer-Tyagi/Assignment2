import request from '@api';
import { buildApiData } from '@utils/api';

//function used to get all configuration table data
export async function getAllConfigurationTableData(
  {
    rootState: {
      common: { isOnline }
    },
    commit,
    dispatch
  },
  params
) {
  params.loaders == 'hideLoader' ? ' ' : dispatch('setLoading', true);
  if (isOnline) {
    try {
      const { data } = await request.get(
        `/config-data?viewAll=true&type=${params.name}`
      );
      if (params.name == 'roles') {
        commit('setRoles', data);
        dispatch('setLoading', false);
      } else if (params.name == 'inspections') {
        commit('setInspectionTypes', data);
        dispatch('setLoading', false);
      } else if (params.name == 'honorifics') {
        commit('setTitles', data);
        dispatch('setLoading', false);
      } else if (params.name == 'industries') {
        commit('setvendorsIndustries', data);
        dispatch('setLoading', false);
      } else if (params.name == 'phone_types') {
        commit('setContactTypes', data);
        dispatch('setLoading', false);
      } else if (params.name == 'client_types') {
        commit('setClientTypes', data);
        dispatch('setLoading', false);
      } else if (params.name == 'policy_types') {
        commit('setPolicyTypes', data);
        dispatch('setLoading', false);
      } else if (params.name == 'policy_categories') {
        commit('setPolicyCategories', data);
        dispatch('setLoading', false);
      } else if (params.name == 'property_types') {
        commit('setPropertyTypes', data);
        dispatch('setLoading', false);
      } else if (params.name == 'claim_reasons') {
        commit('setClaimReasons', data);
        dispatch('setLoading', false);
      } else if (params.name == 'loss_causes') {
        commit('setLossCause', data);
        dispatch('setLoading', false);
      } else if (params.name == 'claim_severities') {
        commit('setClaimSeverities', data);
        dispatch('setLoading', false);
      } else if (params.name == 'template_types') {
        commit('setTemplateTypes', data);
        dispatch('setLoading', false);
      } else if (params.name == 'claim_phases') {
        commit('setPhases', data);
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
  } else {
    if (params.name == 'inspections') {
      commit('setOfflineInspectionTypes');
      dispatch('setLoading', false);
    } else if (params.name == 'honorifics') {
      commit('setOfflineTitles');
      dispatch('setLoading', false);
    } else if (params.name == 'industries') {
      commit('setOfflineVendorIndustries');
      dispatch('setLoading', false);
    } else if (params.name == 'phone_types') {
      commit('setOfflineContactTypes');
      dispatch('setLoading', false);
    } else if (params.name == 'client_types') {
      commit('setOfflineClientTypes');
      dispatch('setLoading', false);
    } else if (params.name == 'policy_types') {
      commit('setOfflinePolicyTypes');
      dispatch('setLoading', false);
    } else if (params.name == 'policy_categories') {
      commit('setOfflinePolicyCategories');
      dispatch('setLoading', false);
    } else if (params.name == 'property_types') {
      commit('setOfflinePropertyTypes');
      dispatch('setLoading', false);
    } else if (params.name == 'claim_reasons') {
      commit('setOfflineClaimReasons');
      dispatch('setLoading', false);
    } else if (params.name == 'loss_causes') {
      commit('setOfflineLossCauses');
      dispatch('setLoading', false);
    } else if (params.name == 'claim_severities') {
      commit('setOfflineClaimSeverities');
      dispatch('setLoading', false);
    } else if (params.name == 'template_types') {
      commit('setOfflineTemplatesTypes');
      dispatch('setLoading', false);
    }
  }
}

//function is used to update the configuration data
export async function editConfigurationData({ dispatch }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `config-data?type=${payload.attributes.type.machineValue}&machineValue=${payload.editedDataMachineValue}`,
      buildApiData('config-data', payload.attributes)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Configuration Data  Updated !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to update Configuration Data'
    });
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
