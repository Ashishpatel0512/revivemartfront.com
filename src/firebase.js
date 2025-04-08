// src/firebase.js

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// 🔑 Replace with your config from Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBfvnevdiZWdFk-EeXYPInrX6NFLfcbf-w",
  authDomain: "revivemart.firebaseapp.com",
  projectId: "revivemart",
  storageBucket: "revivemart.firebasestorage.app",
  messagingSenderId: "1067546599528",
  appId: "1:1067546599528:web:793853fab75fa344455bdd"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
