import request from '@api';
import { buildApiData } from '@utils/api';


export async function getVendors({ commit, dispatch }) {
    dispatch('setLoading', true);
    try {
        const { data } = await request.get('/vendors');
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