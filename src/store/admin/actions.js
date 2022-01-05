import request from '@api';
import { buildApiData } from '@utils/api';
import localDB, { getCollection } from '@services/dexie';

// this function is used to get  the list of tasks available after an action has crossed its due date.
export async function getActionOverDues({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/overduerules?workflowID=${params}`);

    commit('setActionOverDues', data);
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

// this function is used to get the  list of tasks available after an action is completed
export async function getActionCompletion({ commit, dispatch }, params) {
  dispatch('setLoading', true);

  try {
    const { data } = await request.get(`/completionrules?workflowID=${params}`);

    commit('setActionCompletion', data);
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

// we used this function to get  the list of reasons for creating an action in admin pannel.
export async function getActionReasons({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/ruletriggers?workflowID=${params}`);

    commit('setActionReasons', data);
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

// this function is used to get the list of workflow in the admin action item pannel.
export async function getAllWorkFlow({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/workflows/${params}/rules`);
    commit('setAllWorkFlow', data);
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

// function is used to toggle the action item enable/disable switch.
export async function actionItemToggleSwitch({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `workflows/${payload.workflowId}/rules/${payload.ruleId}/${toggleStatus}`,
      buildApiData('actions', payload.data)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Toggle Status Updated'
    });
    return true;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Toggle Status Update Failed!'
    });
    return false;
  }
}

// function is used to add the new workflow action in admin pannel.
export async function addWorkflowAction({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `workflows/${payload.machineValue}/rules`,
      buildApiData('actions', payload.data)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Workflow action added !'
    });
    return true;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Action update failed'
    });
    return false;
  }
}

// function is used for Edit Action Item.

export async function editAdminActionItem({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `workflows/${payload.workflowID}/rules/${payload.id}`,
      buildApiData('actions', payload.attributes)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Action Item  Updated !'
    });
  } catch (e) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to update Action Item'
    });
  }
}

// to Delete Admin Action Items.
export async function adminActionItemDelete({ commit, dispatch }, payload) {
  dispatch('setLoading', true);
  try {
    await request.del(
      `workflows/${payload.workFlowID}/rules/${payload.itemID}`
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'postive',
      message: 'Item deleted successfully!'
    });
  } catch (e) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Error in deleting Item.'
    });
  }
}

// function is used to get the list of workflows, which we used to add in the admin action item pannel.
export async function getWorkflowAction({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/workflows');

    commit('setWorkflowAction', data);
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

// this function is used to get the list of action item for the first time we used to store it for the offline mode also.
export async function getOfficeTaskActions(
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
      const { data } = await request.get(`/workflows/claim_new_claim/actions`);
      commit('setOfficeTaskActions', data);
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
    commit('setOfflineOfficeTaskActions'); // this method is used to used to the action task for the offline mode.
    dispatch('setLoading', false);
  }
}
