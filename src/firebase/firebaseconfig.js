import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBfo7g9S1vkz7RKuLT5aG4GRBRSSF6V61w",
  authDomain: "chekpoint-glabio.firebaseapp.com",
  projectId: "chekpoint-glabio",
  storageBucket: "chekpoint-glabio.appspot.com",
  messagingSenderId: "817649622341",
  appId: "1:817649622341:web:3a63c3f4424f553957722c",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = Platform.OS === 'web' ? getAuth(app) : initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };

