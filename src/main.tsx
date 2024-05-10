import ReactDOM from 'react-dom/client';
import App from './App';
import { getTokenFromFirebase } from './firebaseMessaging/firebase';
import { getMessaging, getToken } from 'firebase/messaging';

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
navigator.serviceWorker.register('/firebase-messaging-sw.js', { type: 'module' });

requestPermission();
console.log(getTokenFromFirebase());
const messaging = getMessaging();
getToken(messaging, {
  vapidKey:
    'BC5zdZRv4mlnV-NbcQuzEvXlepN4jVTGbxh4Phy1kIE_R9G_L2kHcziPRI1kZEs3ap44cjCP9gesNQ2DdFgvpvI',
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      if (localStorage.getItem('fcmToken') && currentToken !== localStorage.getItem('fcmToken')) {
        localStorage.setItem('fcmToken', currentToken);
      } else if (!localStorage.getItem('fcmToken')) {
        localStorage.setItem('fcmToken', currentToken);
      }
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
