import request from '@api';
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
