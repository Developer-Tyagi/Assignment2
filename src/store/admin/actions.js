import request from '@api';
import { buildApiData } from '@utils/api';

export async function getActionOverDues({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/actionoverdues', params);

    commit('setActionOverDues', data);
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

export async function getActionCompletion({ commit, dispatch }, params) {
  dispatch('setLoading', true);

  try {
    const { data } = await request.get('/actioncompletions', params);

    commit('setActionCompletion', data);
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
export async function getActionReasons({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/actionreasons', params);

    commit('setActionReasons', data);
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

export async function getAllWorkFlow({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/workflows/${params}/actions`);

    commit('setAllWorkFlow', data);
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
export async function addWorkflowAction({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `workflows/${payload.machineValue}/actions`,
      buildApiData('actions', payload.data)
    );
    dispatch('setLoading', false);
    return true;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response.data.title
    });
    return false;
  }
}

export async function getWorkflowAction({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/workflows ');

    commit('setWorkflowAction', data);
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
