import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MyShipments from './pages/MyShipments'
import Messages from './pages/Messages'
import CreateTrip from './pages/CreateTrip'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/connexion' element={<Login />} />
        <Route path='/inscription' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/envois' element={<MyShipments />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/proposer-trajet' element={<CreateTrip />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
