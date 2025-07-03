import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

export const saveToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'strict' });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY) || null;
};

export const clearToken = () => {
  Cookies.remove(TOKEN_KEY);
}; 