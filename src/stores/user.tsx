import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import Cookies from 'universal-cookie';

export const $token = persistentAtom('token', undefined, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
export const $isLoggedIn = computed($token, (token) => {
  const cookies = new Cookies(null, { path: '/' });
  const check_token = cookies.get('token');
  if (check_token != undefined) {
    $token.set(check_token);
  }
  return token !== null && token !== undefined && token?.length > 0;
});
