// public/firebase-messaging-sw.js

// Service worker file (must be in public folder)

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// 🔑 Replace with your config from Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBfvnevdiZWdFk-EeXYPInrX6NFLfcbf-w",
    authDomain: "revivemart.firebaseapp.com",
    projectId: "revivemart",
    storageBucket: "revivemart.firebasestorage.app",
    messagingSenderId: "1067546599528",
    appId: "1:1067546599528:web:793853fab75fa344455bdd"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
