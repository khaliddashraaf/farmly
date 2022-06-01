import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDY6cYNzFbF71nBlwD0zK2lTKLfSc3KzjM',
  authDomain: 'farmly-c97b1.firebaseapp.com',
  databaseURL: 'https://farmly-c97b1-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'farmly-c97b1',
  storageBucket: 'farmly-c97b1.appspot.com/',
  messagingSenderId: ' 550219622725',
  appId: 'insert yours: 1:550219622725:ios:422526afc09d8a7c46b62c',
};

app = firebase.initializeApp(firebaseConfig)

export { firebase };