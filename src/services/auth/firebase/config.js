import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBnbN-0rCB744gdZ1sQeG4CU-cMcIExlX4',
  authDomain: 'safe-for-builder.firebaseapp.com',
  databaseURL: 'https://safe-for-builder.firebaseio.com',
  projectId: 'safe-for-builder',
  storageBucket: 'safe-for-builder.appspot.com',
  messagingSenderId: '284582333991',
  appId: '1:284582333991:web:ef49f246ed98f0deb78802',
  measurementId: 'G-9QH0CGPZR0',
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();
const storage = firebase.storage();
export { auth, database, storage, googleAuthProvider, githubAuthProvider, facebookAuthProvider, twitterAuthProvider };
