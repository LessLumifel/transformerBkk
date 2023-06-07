import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import NotFound from './pages/NotFound'
import About from './pages/About'
import Home from './pages/Home'
import Search from './pages/Search'
import Contact from './pages/Contact'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/about'element={<About/>}/>
      <Route path='/search'element={<Search/>}/>
      <Route path='/contact'element={<Contact/>}/>
      <Route/>
    </Routes>
  )
}

function WrappedApp() {
  return(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  )
}

export default WrappedApp



