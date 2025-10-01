// import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './components/Login';
import Logout from './components/Logout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/App.css'

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header />
      <main>
                {user ? (
          <>
            <Logout />
            <Home />
          </>
        ) : (
          <Login />
        )}
        <Home/>
      </main>
      <Footer/>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

