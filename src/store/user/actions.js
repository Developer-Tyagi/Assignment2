import request from '@api';
import { setToken } from '@utils/auth';

export async function userLogin({ commit, dispatch }, formData) {
    dispatch('setLoading', true);
    try {
        const { data } = await request.post('/users/login', formData);
        setToken(data.idToken);
        dispatch('setLoading', false);
        dispatch('setNotification', {
            type: 'positive',
            message: 'Login successful'
        });
        window.location = '/dashboard';
    } catch (e) {
        console.log(e);
        dispatch('setLoading', false);
        dispatch('setNotification', {
            type: 'negative',
            message: 'Login failed. Please use correct email and password.'
        });
    }
}