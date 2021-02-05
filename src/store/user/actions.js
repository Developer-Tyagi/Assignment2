import request from '@api';
import { setToken } from '@utils/auth';
import firebaseAuthorization from '@utils/firebase';

export async function userLogin({ commit, dispatch }, formData) {
  const { data } = formData;
  dispatch('setLoading', true);
  try {
    const res = await firebaseAuthorization.signInWithEmailAndPassword(
      data.attributes.email,
      data.attributes.password
    );
    const token = res.user.getIdToken();
    if (token) {
      setToken(data.attributes.token);
      dispatch('setLoading', false);
      this.$router.push('/dashboard');
    }
  } catch (err) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'Login failed. Please use correct email and password.'
    });
  }
}
