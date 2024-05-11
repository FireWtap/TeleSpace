// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  measurementId: '',
};

firebase.initializeApp(defaultConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  console.log('recevied message...');
  self.registration.showNotification(notificationTitle, notificationOptions);
});
