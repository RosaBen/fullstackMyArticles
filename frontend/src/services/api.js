const API_BASE_URL = 'http://127.0.0.1:3000';

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
  },

  getArticles: async () => {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
};

console.log('API Service Loaded', apiService);