import request from '@api';


export function getLeadsList({ commit, dispatch }) {
    dispatch('setLoading', true);
    try {
        const { data } = await request.get('/leads');
        commit('setActiveLeads', data);
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

export function getArchiveLeadsList({ commit, dispatch }) {
    dispatch('setLoading', true);
    try {
        const { data } = await request.get('/leads?archive=true');
        commit('setArchiveLeads', data);
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