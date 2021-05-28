import request from '@api';
import { buildApiData } from '@utils/api';
import { setToken, setCurrentUser, setFCMToken } from '@utils/auth';
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

export async function getUserInfo({ dispatch, state }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/users/me');
    setCurrentUser(data);

    dispatch('setLoading', false);
    return data;
  } catch (e) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response
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
      message: e.response[0].detail
    });
    return false;
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
    dispatch('setNotification', {
      type: 'positive',
      message: 'User created'
    });
  } catch (e) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].detail
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
      `/users/setpassword`,
      buildApiData('users', payload)
    );
    dispatch('setLoading', false);
    return true;
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

// Post Api for Inspection Type

export async function addInspectionType({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/inspections',
      buildApiData('inspections', payload)
    );
    dispatch('setLoading', false);
    return true;
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
// This is Post Api for Honorific

export async function addHonorifics({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/honorifics',
      buildApiData('honorifics', payload)
    );
    dispatch('setLoading', false);
    return true;
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
// Add Industry

export async function addIndustry({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/industries',
      buildApiData('industries', payload)
    );
    dispatch('setLoading', false);
    return true;
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

export async function addPhone({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/phonetypes',
      buildApiData('phonetypes', payload)
    );
    dispatch('setLoading', false);
    return true;
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
// Add Client Type
export async function addClientType({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/ctypes',
      buildApiData('ctypes', payload)
    );
    dispatch('setLoading', false);
    return true;
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
// Add Policy Type
export async function addPolicy({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/ptypes',
      buildApiData('ptypes', payload)
    );
    dispatch('setLoading', false);
    return true;
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
// Add  policyCategories
export async function addPolicyCategories({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/pcategories',
      buildApiData('pcategories', payload)
    );
    dispatch('setLoading', false);
    return true;
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
// addProperty;
export async function addProperty({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/prtypes',
      buildApiData('prtypes', payload)
    );
    dispatch('setLoading', false);
    return true;
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
// Add Claim Reason
export async function addClaimReason({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/claimreasons',
      buildApiData('claimreasons', payload)
    );
    dispatch('setLoading', false);
    return true;
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
// Add Loss Info

export async function addLoss({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/losscauses',
      buildApiData('losscauses', payload)
    );
    dispatch('setLoading', false);
    return true;
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
export async function addClaimSeverity({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/claimseverities',
      buildApiData('claimseverities', payload)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Claim severity added !'
    });
    return true;
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

export async function addOnboardingStep({ dispatch, state }, payloadData) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/users/${payloadData.id}/set-onboard-step`,
      buildApiData('users', payloadData.payload)
    );
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
export async function setOnboard({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/users/setOnboard`,
      buildApiData('users', payload)
    );
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

export async function sendPushNotificationToken({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      'users/pushtokens',
      buildApiData('pushtokens', payload)
    );
    dispatch('setLoading', false);
    return true;
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

export async function deletePushNotificationToken({ commit, dispatch }, token) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.del(`/users/pushtokens/${token}`);
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
  }
}
export async function editUserInfo({ dispatch, state }, user) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/users/${user.id}`,
      buildApiData('users', user.data)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'User info  Updated !'
    });
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: 'failed to update vendor'
    });
  }
}
