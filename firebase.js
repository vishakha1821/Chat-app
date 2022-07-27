import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyC7jRWGhkeBVIhqBbSxienBhW0fHV-3Gjg",
    authDomain: "mychat-cf59e.firebaseapp.com",
    projectId: "mychat-cf59e",
    storageBucket: "mychat-cf59e.appspot.com",
    messagingSenderId: "326614548955",
    appId: "1:326614548955:web:9d875984aa0f60eca4e7fe"
  }).auth();