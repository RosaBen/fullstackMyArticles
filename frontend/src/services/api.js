const API_BASE_URL = 'http://127.0.0.1:3000';

export const apiService = {
  // LOGIN
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
      credentials: 'include',
    });
    return response.json();
  },

  // LOGOUT
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/users/sign_out`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return response.json();
  },

  // GET CURRENT USER
  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/member-data`, {
      method: 'GET',
      credentials: 'include',
    });
    return response.json();
  },

  // REGISTER
  createUser: async (username, email, password, passwordConfirmation) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      }),
      credentials: 'include',
    });
    const data = await response.json();

    return data;
  },

  // GET ARTICLES
  getArticles: async () => {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // GET A SINGLE ARTICLE
  getArticleById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
