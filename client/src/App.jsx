
import React, { useContext, useEffect } from 'react'

import { BrowserRouter,Routes, Route } from 'react-router-dom'
import AddItem from './Component/AddItem'
import List from './Component/List'
import './App.css'
import EditItem from './Component/EditItem'

function App() {

  return (
    <>
        <BrowserRouter>
        <Routes>

        <Route path="/" element={<List />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/editItem/:id" element={<EditItem />} />
</Routes>
</BrowserRouter>
     
    </>
  )
}

export default App
