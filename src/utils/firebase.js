import firebase from 'firebase/app';
import 'firebase/auth';
import { setToken } from './auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuthorization = firebaseApp.auth();

export default firebaseAuthorization;

export function refreshToken() {
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(function(token) {
      setToken(token);
    })
    .catch(function(error) {
      if (error) throw error;
    });
}

export function removeFirebaseToken() {
  firebaseAuthorization.signOut();
}
