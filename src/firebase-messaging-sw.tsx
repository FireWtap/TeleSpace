import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCXPh_qT_9JTEbiUzFU57-fZZbDug63RiI',
  authDomain: 'ddavidmelo-14dc2.firebaseapp.com',
  databaseURL: 'https://ddavidmelo-14dc2.firebaseio.com',
  projectId: 'ddavidmelo-14dc2',
  storageBucket: 'ddavidmelo-14dc2.appspot.com',
  messagingSenderId: '211150998925',
  appId: '1:211150998925:web:2098c2ff8f71989ad141c4',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
