import request from '@api';
import { buildApiData } from '@utils/api';
import {
  setToken,
  setCurrentUser,
  setFCMToken,
  getCurrentUser
} from '@utils/auth';
import firebaseAuthorization from '@utils/firebase';

// function is used for user login .
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

// function is used for getting the login user details.
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

// function is used for adding the organisation details.
export async function createUserForOrganization({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/organizations',
      buildApiData('users', payload)
    );
    var userdata = data;
    if (data) {
      const firebaseRes = await firebaseAuthorization.signInWithEmailAndPassword(
        userdata.attributes.email,
        userdata.attributes.password
      );
      if (firebaseRes && firebaseRes.user) {
        const token = await firebaseRes.user.getIdToken();
        if (token) {
          await setToken(token);
          await dispatch('getUserInfo');
          dispatch('setLoading', false);
          return true;
        }
      }
    }
    dispatch('setLoading', false);
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message:
        e.response[0].detail == 'stripe token is missing'
          ? 'Please ask admin to add you as a beta user'
          : e.response[0].detail
    });
    return false;
  } finally {
    dispatch('setLoading', false);
  }
}

export async function checkExistingEmail({ dispatch }, email) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get(`/users/email?email=${email}`);
    dispatch('setLoading', false);
    if (data.attributes.exists) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message:
        e.response[0].detail == 'stripe token is missing'
          ? 'Please ask admin to add you as a beta user'
          : e.response[0].detail
    });
    return false;
  }
}

// function is used for updating the organisation details.
export async function updateUserForOrganization({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      '/organizations',
      buildApiData('organizations', payload.data)
    );
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'positive',
      message: 'Company details  Updated !'
    });
    return true;
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

// function is used for adding the new user.
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

// function is used for Verifying the Oob Code.
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

// function is used for setting new password.
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

// function is used for resetting the password.

export async function resetPassword({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      `/users/resetpassword`,
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
  console.log(payload, 444);
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/config-data',
      buildApiData('config-data', payload)
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
      '/config-data',
      buildApiData('config-data', payload)
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
      '/config-data',
      buildApiData('config-data', payload)
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

// function is used adding the phone number.
export async function addPhone({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/config-data',
      buildApiData('config-data', payload)
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
      '/config-data',
      buildApiData('config-data', payload)
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

// Add  policyCategories
export async function addPolicyCategories({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/config-data',
      buildApiData('config-data', payload)
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
//add policy
export async function addPolicy({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/config-data',
      buildApiData('config-data', payload)
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
      '/config-data',
      buildApiData('config-data', payload)
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
      '/config-data',
      buildApiData('config-data', payload)
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
      '/config-data',
      buildApiData('config-data', payload)
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

// function is used for adding the claim severity.
export async function addClaimSeverity({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/config-data',
      buildApiData('config-data', payload)
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

// function is used for adding the notification token
export async function sendPushNotificationToken({ dispatch, state }, payload) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      'users/pushtokens',
      buildApiData('pushtokens', payload)
    );

    setFCMToken(payload.token);
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

// function is used for deleting the notification token.
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

// function is used for updating the user profile.
export async function editUserProfile({ dispatch, state }, user) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.post(
      '/users/me',
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
      message: 'failed to update User'
    });
  }
}

// Update Access token after email update
export async function updateAccessToken({ dispatch, state }, email) {
  let current_user = getCurrentUser();
  let payload = {
    email: email
  };
  dispatch('setLoading', true);
  try {
    const { data } = await request.patch(
      `/users/${current_user.id}/setemail`,
      buildApiData('users', payload)
    );
    if (data && data.attributes.idToken) {
      setToken(data.attributes.idToken);
      return true;
    }
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
      message: 'failed to update User'
    });
  }
}

// API for getting Photo Id Keys
export async function getPhotoIdKeys({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const { data } = await request.get('/organizations/photoid');
    commit('setPhotoIdKeys', data);
    dispatch('setLoading', false);
    return data;
  } catch (e) {
    console.log(e);
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response[0].title
    });
  }
}

// redirect to google authentication
export async function toRedirectGoogleAuth({ commit, dispatch }) {
  dispatch('setLoading', true);
  try {
    const result = await request.get('users/google-oauth2');
    window.location = result.oauth2URL;
    dispatch('setLoading', false);
  } catch (e) {
    dispatch('setLoading', false);
    dispatch('setNotification', {
      type: 'negative',
      message: e.response
    });
  }
}
