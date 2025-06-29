// Client-side authentication utilities

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Custom events for real-time updates
const AUTH_EVENTS = {
  LOGIN: 'auth:login',
  LOGOUT: 'auth:logout',
  UPDATE: 'auth:update'
};

// Dispatch custom event
const dispatchAuthEvent = (eventType, data = null) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(eventType, { detail: data }));
  }
};

// Save token and user data to localStorage
export const saveAuthData = (token, user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    // Dispatch login event
    dispatchAuthEvent(AUTH_EVENTS.LOGIN, { user, token });
  }
};

// Get token from localStorage
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

// Get user data from localStorage
export const getUser = () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

// Remove auth data from localStorage
export const clearAuthData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Dispatch logout event
    dispatchAuthEvent(AUTH_EVENTS.LOGOUT);
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// API call wrapper with authentication
export const apiCall = async (url, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, config);
  
  if (response.status === 401) {
    // Token expired or invalid
    clearAuthData();
    window.location.href = '/signin';
    return null;
  }

  return response;
};

// Sign up function
export const signUp = async (userData) => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      saveAuthData(data.token, data.user);
      return { success: true, data };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

// Sign in function
export const signIn = async (credentials) => {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.ok) {
      saveAuthData(data.token, data.user);
      return { success: true, data };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

// Sign out function
export const signOut = () => {
  clearAuthData();
  // Use router.push instead of window.location.href for better navigation
  if (typeof window !== 'undefined') {
    // Force page reload to ensure all components update
    window.location.reload();
  }
};

// Export events for components to listen to
export { AUTH_EVENTS }; 