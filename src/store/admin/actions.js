import request from '@api';
import { buildApiData } from '@utils/api';

export async function getActionOverDues({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/actionoverdues');
    console.log(data);
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

export async function getActionCompletion({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/actioncompletions');
    console.log(data, 77);
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
