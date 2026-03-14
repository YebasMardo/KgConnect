import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import MyShipments from './pages/MyShipments'
import Messages from './pages/Messages'
import CreateTrip from './pages/CreateTrip'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/connexion" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/connexion' element={<Login />} />
        <Route path='/inscription' element={<Register />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/envois' element={<ProtectedRoute><MyShipments /></ProtectedRoute>} />
        <Route path='/messages' element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path='/proposer-trajet' element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
