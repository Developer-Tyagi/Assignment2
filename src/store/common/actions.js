import request from '@api';
import { buildApiData } from 'src/utils/api';
import localDB, { getCollection } from '@services/dexie';

export function setLoading({ commit }, value) {
  commit('setLoading', value);
}
export async function getClientTypes({ commit, dispatch }) {
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

export async function getRoles({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/roles');
    // const { data } = {
    //   links: {
    //     self: ''
    //   },
    //   meta: {
    //     count: 3
    //   },
    //   data: [
    //     {
    //       id: '6054700cf5a23cc12fea11eb',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:34:04.517Z',
    //         updated: '2021-03-19T09:34:04.517Z',
    //         value: 'Adjuster',
    //         machineValue: 'adjuster',
    //         isPaid: true,
    //         permissions: ['view_all_claims', 'edit_claim']
    //       }
    //     },
    //     {
    //       id: '60547078f5a23cc12fea11ec',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:35:52.802Z',
    //         updated: '2021-03-19T09:35:52.802Z',
    //         value: 'ALE Adjuster',
    //         machineValue: 'ale_adjuster',
    //         isPaid: true,
    //         permissions: [
    //           'view_all_claims',
    //           'create_carrier',
    //           'edit_all_claims'
    //         ]
    //       }
    //     },
    //     {
    //       id: '60547078f5a23cc12fea11ec',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:35:52.802Z',
    //         updated: '2021-03-19T09:35:52.802Z',
    //         value: 'ALE Adjuster1',
    //         machineValue: 'ale_adjuster1',
    //         isPaid: true,
    //         permissions: [
    //           'edit_all_claims',
    //           'delete_all_claims',
    //           'create_lead',
    //           'delete_all_mortgages'
    //         ]
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Officeeee eeeee',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: ['view_all_claims']
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Office Manager',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: []
    //       }
    //     },
    //     {
    //       id: '605470d5f5a23cc12fea11ed',
    //       type: 'roles',
    //       attributes: {
    //         created: '2021-03-19T09:37:25.892Z',
    //         updated: '2021-03-19T09:37:25.892Z',
    //         value: 'Himanshu',
    //         machineValue: 'office_manager',
    //         isPaid: false,
    //         permissions: ['view_all_claims']
    //       }
    //     }
    //   ]
    // };
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

export function changeNetworkStatus({ commit, dispatch }, isOnline) {
  commit('setNetworkStatus', isOnline);
  if (isOnline) {
    dispatch('syncLocalDataBase');
  }
}

export async function syncLocalDataBase({ dispatch, state }) {
  let leadsLocalCollection = await getCollection('activeLeads').toArray();
  leadsLocalCollection.forEach(lead => {
    if (lead['offline']) {
      const id = lead.id;
      delete lead['id'];
      delete lead['offline'];
      dispatch('addLeads', lead).then(response => {
        if (response) {
          localDB.activeLeads
            .where('id')
            .equals(id)
            .delete();
        }
      });
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
