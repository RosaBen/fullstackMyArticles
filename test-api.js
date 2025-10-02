// Test script pour vérifier l'API sans navigateur
const API_BASE_URL = "http://127.0.0.1:3000";

// Variable globale pour stocker le token JWT
let authToken = null;

async function login() {
  console.log("🔐 Attempting to login...");
  const response = await fetch(`${API_BASE_URL}/users/sign_in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: { email: "test@test.com", password: "password" },
    }),
  });

  console.log("📡 Login Response Status:", response.status);
  console.log(
    "📡 Login Response Headers:",
    Object.fromEntries(response.headers.entries())
  );

  // Récupérer le token JWT depuis l'header Authorization
  authToken = response.headers.get("Authorization");
  console.log("🔑 JWT Token:", authToken);

  const data = await response.json();
  console.log("📄 Login Response Data:", data);
  return data;
}

async function createArticle() {
  console.log("📝 Attempting to create article...");
  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Ajouter le token JWT si on l'a récupéré lors du login
    if (authToken) {
      headers.Authorization = authToken;
      console.log("🔑 Using auth token:", authToken);
    }

    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        article: {
          title: "Test jsasa",
          content: "Ceci est unassjkkgaskgjksaassghah",
        },
      }),
    });

    console.log("📡 Create Article Response Status:", response.status);
    console.log(
      "📡 Create Article Response Headers:",
      Object.fromEntries(response.headers.entries())
    );

    const data = await response.json();
    console.log("📄 Create Article Response Data:", data);
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

// Fonction pour tester createUser
// async function testCreateUser() {
//   console.log("🧪 Testing createUser API...");

//   try {
//     const response = await fetch(`${API_BASE_URL}/users`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           username: "testuser",
//           email: "test@example.com",
//           password: "password123",
//           password_confirmation: "password123",
//         },
//       }),
//     });

//     console.log("📡 Response Status:", response.status);
//     console.log("📡 Response OK:", response.ok);
//     console.log(
//       "📡 Response Headers:",
//       Object.fromEntries(response.headers.entries())
//     );

//     const data = await response.json();
//     console.log("📄 Response Data:", data);
//   } catch (error) {
//     console.log("❌ Error:", error.message);
//   }
// }

// async function getArticleById(id = 1) {
//   const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });

//   console.log("📡 Response Status:", response.status);
//   console.log("📡 Response OK:", response.ok);
//   console.log(
//     "📡 Response Headers:",
//     Object.fromEntries(response.headers.entries())
//   );
//   const data = await response.json();
//   console.log("📄 Response Data:", data);
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return data;
// }
// Fonction pour tester la connexion de base
// async function testBasicConnection() {
//   console.log("🔗 Testing basic connection...");

//   try {
//     const response = await fetch(API_BASE_URL);
//     console.log("📡 Basic connection status:", response.status);
//     console.log("📡 Server responds:", response.ok);
//   } catch (error) {
//     console.log("❌ Connection failed:", error.message);
//   }
// };

// Exécuter les tests
async function runTests() {
  console.log("🚀 Starting API tests...\n");

  // await testBasicConnection();
  console.log(""); // ligne vide
  await login();
  await createArticle();
  // await getArticleById(1);
  // await testCreateUser();

  console.log("\n✅ Tests completed");
}

runTests();
