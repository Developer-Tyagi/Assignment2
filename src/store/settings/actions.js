import request from '@api';
import { buildApiData } from '@utils/api';


export async function getInspectionTypes({ commit, dispatch }) {
    dispatch('setLoading', true);
    try {
        const { data } = await request.get('/inspections');
        commit('setInspectionTypes', data);
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

export async function addInspectionTypes({ dispatch, state }, payload) {
    dispatch('setLoading', true);
    try {
        const { data } = await request.post('/inspections', buildApiData('inspections', payload));
        dispatch('setLoading', false);
        this.$router.push("/inspection-types")
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