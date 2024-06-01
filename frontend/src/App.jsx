import React from 'react'
import AddNote from './components/AddNote'
import Navbar from './components/Navbar'
import {Toaster} from 'react-hot-toast'
import "./App.css"
import Login from './components/Login'
import Signup from './components/Signup'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Profile from './components/Profile'
const App = () => {
  return (
    <div>

      <Router>

      <Toaster position='top-center'/>
      <Navbar/>
      <Routes>
<Route path='/' element={<AddNote/>}/>
<Route path='/home' element={<AddNote/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/profile' element={<Profile/>}/>


      
      </Routes>
      </Router>
    </div>
  )
}

export default App