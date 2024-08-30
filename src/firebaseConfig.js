import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD6e21U2a2wMRdreNTuOJ3DyndDwDABO1M",
  authDomain: "bookexchangeapp-3e997.firebaseapp.com",
  projectId: "bookexchangeapp-3e997",
  storageBucket: "bookexchangeapp-3e997.appspot.com",
  messagingSenderId: "59592521904",
  appId: "1:59592521904:web:81d4ad64275e9612a0a375",
  measurementId: "G-HDM37DC0FX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
