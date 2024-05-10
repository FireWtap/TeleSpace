// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { firebaseConfig } from '@/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
// Add the public key generated from the console here.
export const getTokenFromFirebase = () => {
  getToken(messaging, {
    vapidKey:
      'BC5zdZRv4mlnV-NbcQuzEvXlepN4jVTGbxh4Phy1kIE_R9G_L2kHcziPRI1kZEs3ap44cjCP9gesNQ2DdFgvpvI',
  });
};
