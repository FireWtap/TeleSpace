import { getMessaging, getToken } from 'firebase/messaging';

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, {
  vapidKey:
    'BC5zdZRv4mlnV-NbcQuzEvXlepN4jVTGbxh4Phy1kIE_R9G_L2kHcziPRI1kZEs3ap44cjCP9gesNQ2DdFgvpvI',
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log(currentToken);
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
