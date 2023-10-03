import { useState } from 'react'

import { Route,Routes } from 'react-router-dom'
import LoginPage from './Login'
import InvoicePdf from './HtmltoPdf'
import DashBoard from './LoginDash'

function App() {

  return(
    <>
    
    <Routes>
      <Route path="/" element={<LoginPage/>}></Route>
      {/* <Route path="/info/:posId" element={<LoginDash/>}></Route> */}
      <Route path="/info/:id" element={<DashBoard/>}></Route>
      <Route path="/invoice" element={<InvoicePdf/>}></Route>
    </Routes>
    </>
  )
}

export default App
