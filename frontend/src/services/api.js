const API_BASE_URL = 'http://127.0.0.1:3000';

// Fonction utilitaire pour debugger les cookies
const debugCookies = () => {
  console.log('🍪 All cookies:', document.cookie);
  console.log('🔍 Cookie details:');
  document.cookie.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    console.log(`   ${name}: ${value}`);
  });
};

export const apiService = {
  // LOGIN
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
      credentials: 'include',
    });

    const data = await response.json();
    return { data };
  },

  // LOGOUT
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/users/sign_out`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
    });

    return response.json();
  },

  // GET CURRENT USER
  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/member-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
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
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
        Accept: 'application/json',
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
      console.log('🚀 Starting article creation...');
      console.log('📝 Data to send:', { title, content });
      console.log('🌐 API URL:', `${API_BASE_URL}/articles`);

      // Debug cookies avant la requête
      debugCookies();

      const requestBody = JSON.stringify({ article: { title, content } });
      console.log('📦 Request body:', requestBody);

      const response = await fetch(`${API_BASE_URL}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: requestBody,
        credentials: 'include',
      });

      console.log('📡 Response received!');
      console.log('📡 Response status:', response.status);
      console.log('📡 Response statusText:', response.statusText);
      console.log('📡 Response ok:', response.ok);
      console.log(
        '📡 Response headers:',
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        console.error('❌ Response not OK, trying to parse error...');
        let errorData;
        let responseText = '';

        try {
          responseText = await response.text();
          console.log('📄 Raw response text:', responseText);

          if (responseText) {
            errorData = JSON.parse(responseText);
          } else {
            errorData = {
              error: `Empty response with status ${response.status}`,
            };
          }
        } catch (parseError) {
          console.error('❌ Failed to parse error response:', parseError);
          errorData = {
            error: `HTTP ${response.status}: ${response.statusText}`,
            rawResponse: responseText,
          };
        }

        console.error('❌ Final error data:', errorData);
        throw new Error(
          errorData.error ||
            errorData.message ||
            `HTTP error! status: ${response.status}`
        );
      }

      console.log('✅ Response OK, parsing JSON...');
      const result = await response.json();
      console.log('✅ Article created successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Create article error (final catch):', error);
      console.error('❌ Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
  },
};
