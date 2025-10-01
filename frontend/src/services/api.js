const API_BASE_URL = '/api';

export const apiService = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: { email, password } }),
      credentials: 'include'
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/users/sign_out`, {
      method: 'DELETE',
      credentials: 'include'
    });
    return response.json();
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/member-data`, {
      method: 'GET',
      credentials: 'include'
    });
    return response.json();
  }
};