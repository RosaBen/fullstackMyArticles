// import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import './styles/App.css'

function App() {

  return (
    <>
      <Header />
      <main>
        <Home/>
      </main>
      <Footer/>
    </>
  )
}

export default App

