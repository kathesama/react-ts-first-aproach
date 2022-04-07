import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// @ts-ignore
import logo from './logo.svg'

import Home from './components/home/home'
import NotFound from './components/notFound/notFound'

// import './App.module.scss'

const App: FC<any> = ({ props }): any => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
