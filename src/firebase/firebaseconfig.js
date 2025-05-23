import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfo7g9S1vkz7RKuLT5aG4GRBRSSF6V61w",
  authDomain: "chekpoint-glabio.firebaseapp.com",
  projectId: "chekpoint-glabio",
  storageBucket: "chekpoint-glabio.appspot.com",
  messagingSenderId: "817649622341",
  appId: "1:817649622341:web:3a63c3f4424f553957722c",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };

