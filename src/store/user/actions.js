import request from '@api';
import { buildApiData } from '@utils/api';
import { setToken, setCurrentUser } from '@utils/auth';
import firebaseAuthorization from '@utils/firebase';

export async function userLogin({ commit, dispatch }, formData) {
  const { data } = formData;
  dispatch('setLoading', true);
  try {
    const firebaseRes = await firebaseAuthorization.signInWithEmailAndPassword(
      data.attributes.email,
      data.attributes.password
    );
    if (firebaseRes && firebaseRes.user) {
      const token = await firebaseRes.user.getIdToken();
      if (token) {
        setToken(token);
        return true;
      }
    }
    dispatch('setLoading', false);
    return true;
  } catch (error) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Login failed. Please use correct email and password.'
    });
  }
}

export async function createUserForOrganization({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/organizations',
      buildApiData('organization', payload)
    );
    dispatch('setLoading', false);
    this.$router.push('/info');
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

export async function getUserInfo({ dispatch, state }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/users/me');
    setCurrentUser(data);
    if (data.attributes.onboard.isCompleted) {
      this.$router.push('/dashboard');
    } else {
      this.$router.push('/onboarding');
    }
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

export async function addUser({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/users',
      buildApiData('users', payload)
    );
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

export async function verifyOobCode({ commit, dispatch }, params) {
  dispatch('setLoading', true);
  try {
    const response = await request.get('/users/verifyOOBCode', {
      ...params
    });
    dispatch('setLoading', false);
    return response;
  } catch (e) {
    dispatch('setLoading', false);
    return false;
  }
}

export async function setPassword({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/users/${payload.id}/set-password`,
      buildApiData('users', payload.password)
    );
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
