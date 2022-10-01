import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from './components/notFound/notFound';
import SignUpPage from './pages/signUpPage/signUpPage';
import HeaderPage from './pages/homePage/headerPage';
import LoginPage from './pages/loginPage/loginPage';
import UserPage from './pages/userPage/userPage';
import InvalidUrlPage from './pages/invalidUrlPage/invalidUrlPage';
import ActivationPage from './pages/activationPage/activationPage';

const App: FC<any> = (): any => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HeaderPage />}>
        <Route path='signup' element={<SignUpPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='user'>
          <Route index element={<InvalidUrlPage />} />
          <Route path=':id' element={<UserPage />} />
        </Route>
        <Route path='activate'>
          <Route index element={<InvalidUrlPage />} />
          <Route path=':token' element={<ActivationPage />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
   </BrowserRouter>
);

export default App;
