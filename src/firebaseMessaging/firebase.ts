// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBO5tsJtxE06NnNb9N8b2UY7b7YhtGsEnY',
  authDomain: 'telespace-eeccd.firebaseapp.com',
  projectId: 'telespace-eeccd',
  storageBucket: 'telespace-eeccd.appspot.com',
  messagingSenderId: '491194743669',
  appId: '1:491194743669:web:b93effb38c6dff77e7313c',
  measurementId: 'G-ZDPQRDF98K',
};
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
// Add the public key generated from the console here.
export const getTokenFromFirebase = () => {
  getToken(messaging, {
    vapidKey:
      'BC5zdZRv4mlnV-NbcQuzEvXlepN4jVTGbxh4Phy1kIE_R9G_L2kHcziPRI1kZEs3ap44cjCP9gesNQ2DdFgvpvI',
  });
};
