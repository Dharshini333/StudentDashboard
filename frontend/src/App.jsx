import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import CreateStudent from './Components/CreateStudent'
import UpdateStudent from './Components/UpdateStudent'
import './App.css'

function App() {
  return (
    <div>   
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/create' element={<CreateStudent/>}></Route>
        <Route path='/update/:id' element={<UpdateStudent/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App