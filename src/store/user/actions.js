import request from '@api';
import { buildApiData } from '@utils/api';
import { setToken } from '@utils/auth';
import firebaseAuthorization from '@utils/firebase';

export async function userLogin({ commit, dispatch }, formData) {
  const { data } = formData;
  dispatch('setLoading', true);
  firebaseAuthorization
    .signInWithEmailAndPassword(data.attributes.email, data.attributes.password)
    .then(res => {
      // Signed in
      dispatch('setLoading', false);
      res.user.getIdToken().then(token => {
        setToken(token);
        this.$router.push('/dashboard');
      });
    })

    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch('setLoading', false);
      dispatch('setNotification', {
        type: 'negative',
        message: 'Login failed. Please use correct email and password.'
      });
    });
}

export async function createUserForOrganization({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/organizations',
      buildApiData('organization', payload)
    );
    dispatch('setLoading', false);
    this.$router.push('/forgot-password');
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
// This is for adding user
export async function addUser({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/users',
      buildApiData('users', payload)
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
