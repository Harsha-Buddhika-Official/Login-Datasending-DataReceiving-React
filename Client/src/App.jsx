import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginSignup from './LoginSignup'
import Dashboard from './Dashboard'
import Login from './Component/Login'
import Signup from './Component/Signup'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginSignup/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
