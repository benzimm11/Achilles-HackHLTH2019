import firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyCGBvEmEkwK0wJKlxPx9yIKpCXa0cfdrv0',
  authDomain: 'hackhlth2019.firebaseapp.com',
  databaseURL: 'https://hackhlth2019.firebaseio.com',
  projectId: 'hackhlth2019',
  storageBucket: 'hackhlth2019.appspot.com',
  messagingSenderId: '831117768175',
  appId: '1:831117768175:web:db6985272eb4d36327721a',
};

let app = firebase.initializeApp(config);

export const db = app.database();
