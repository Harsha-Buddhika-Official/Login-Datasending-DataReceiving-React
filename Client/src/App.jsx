import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Component/Login'
import Signup from './Component/Signup'
import ProfileEditForm from './Component/ProfileEditForm'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/profile/edit' element={<ProfileEditForm />} />
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
