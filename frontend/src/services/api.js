const API_BASE_URL = 'http://127.0.0.1:3000';

let authToken = null;
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
    authToken = response.headers.get('Authorization');
    const data = await response.json();
    return {
      authToken,
      data,
    };
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

  // CREATE ARTICLE
  createArticle: async (title, content) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      if (authToken) {
        headers.Authorization = authToken;
      }

      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ article: { title, content } }),
        credentials: 'include',
      });
      return response.json();
    } catch (error) {
      console.log('❌ Error:', error.message);
    }
  },
};
