import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
import Cookies from 'universal-cookie';

export const $token = persistentAtom('token', undefined, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
export const $isLoggedIn = computed($token, (token) => token !== null && token !== undefined && token?.length > 0);

export const $currentDir = persistentAtom('currentDir', -1, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const $currentSelectedId = atom(-1);

export const $currentFileInfo = atom({});
