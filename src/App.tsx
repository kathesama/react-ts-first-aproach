import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './components/home/home'
import NotFound from './components/notFound/notFound'
import SignUpPage from "@/pages/signUpPage/signUpPage";

const App: FC<any> = (): any => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignUpPage />} />
      <Route path='/test' element={<Home />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
