import { getToken, clearToken } from './token';
import { dispatchAuthEvent, AUTH_EVENTS } from './events';

export const apiCall = async (url, options = {}) => {
  const token = getToken();
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(url, config);
  if (response.status === 401) {
    clearToken();
    window.location.href = '/signin';
    return null;
  }
  return response;
};

export const signUp = async (userData) => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      dispatchAuthEvent(AUTH_EVENTS.LOGIN);
      return { success: true, data };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      dispatchAuthEvent(AUTH_EVENTS.LOGIN);
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.error || 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export const signOut = async () => {
  const token = getToken();
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } catch (err) {
  }
  clearToken();
  dispatchAuthEvent(AUTH_EVENTS.LOGOUT);
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}; 