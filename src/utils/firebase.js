import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAEJc2JbsAbjTtUDBs5xZugsDiZYIb98AY',
  authDomain: 'pre-prod-286801.firebaseapp.com',
  databaseURL: 'https://pre-prod-286801.firebaseio.com',
  projectId: 'pre-prod-286801',
  storageBucket: 'pre-prod-286801.appspot.com',
  messagingSenderId: '452299913095',
  appId: '1:452299913095:web:f6ed43665baf89af5e8522',
  measurementId: 'G-4H5J4F5KRW'
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuthorization = firebaseApp.auth();

export default firebaseAuthorization;
