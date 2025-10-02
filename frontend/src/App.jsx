import { Routes, Route } from "react-router-dom";
// import { useState } from 'react'
// import Alerts from './components/shared/Alerts.jsx'
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './components/Login';
import Registration from './components/Registration'
import './styles/App.css'

function App() {
return (
  <AuthProvider>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
      </Routes>
    </main>
    <Footer />
  </AuthProvider>
)
}

export default App;

