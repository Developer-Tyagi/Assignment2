import request from '@api';
import { buildApiData } from '@utils/api';


export async function getVendors({ commit, dispatch }) {
    dispatch('setLoading', true);
    try {
        const { data } = await request.get('/vendors');
        commit('setvendors', data);
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

export async function addVendor({ dispatch, state }, payload) {
    dispatch('setLoading', true);
    try {
        const { data } = await request.post('/vendors', buildApiData('vendors', payload));
        dispatch('setLoading', false);
        this.$router.push("/vendors")
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

export async function getVendorIndustries({ commit, dispatch }) {
    dispatch('setLoading', true);
    try {
        const { data } = await request.get('/industries');
        commit('setvendorsIndustries', data);
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