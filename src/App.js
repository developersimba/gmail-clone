import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from "./components/Signin"
import Main from "./components/Main"

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/main' element={<Main/>}/>
      </Routes>
    </div>
  )
}

export default App
