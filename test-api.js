// Test script pour vérifier l'API sans navigateur
const API_BASE_URL = "http://127.0.0.1:3000";

// // console.log("🔥 API Service Loaded", apiService);
// console.log("🔥 Test console log - if you see this, console.log works!");

// // 🧪 TEST DIRECT DE L'API - Tester createUser automatiquement
// setTimeout(async () => {
//   console.log("🧪 Starting API test...");

//   // Test 1: Vérifier la connexion de base
//   try {
//     console.log("🔗 Testing basic connection to:", API_BASE_URL);
//     const response = await fetch(API_BASE_URL);
//     console.log("📡 Basic connection status:", response.status);
//   } catch (error) {
//     console.log("❌ Basic connection failed:", error.message);
//   }

//   // Test 2: Tester createUser
//   try {
//     console.log("🧪 Testing createUser...");
//     const result = await apiService.createUser(
//       "testuser",
//       "test@example.com",
//       "password123",
//       "password123"
//     );
//     console.log("✅ createUser SUCCESS:", result);
//   } catch (error) {
//     console.log("❌ createUser ERROR:", error);
//   }
// }, 2000); // Attendre 2 secondes après le chargement

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

async function getArticleById(id = 1) {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  console.log("📡 Response Status:", response.status);
  console.log("📡 Response OK:", response.ok);
  console.log(
    "📡 Response Headers:",
    Object.fromEntries(response.headers.entries())
  );
  const data = await response.json();
  console.log("📄 Response Data:", data);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return data;
}
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
  await getArticleById();

  console.log("\n✅ Tests completed");
}

runTests();
