import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import LoginSignup from './LoginSignup'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginSignup/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/Login' element={<LoginSignup/>}/>
          <Route path='/Signup' element={<LoginSignup/>}/>
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
