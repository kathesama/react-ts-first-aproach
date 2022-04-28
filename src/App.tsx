import React, { FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import NotFound from './components/notFound/notFound';
import SignUpPage from '@/pages/signUpPage/signUpPage';
// import LanguageSelector from '@/components/languageSelector/languageSelector';
import HeaderPage from '@/pages/homePage/headerPage';
import LoginPage from '@/pages/loginPage/loginPage';
import UserPage from '@/pages/userPage/userPage';

const App: FC<any> = (): any => (
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderPage />}>
            <Route path='signup' element={<SignUpPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='user/:id' element={<UserPage />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
     </BrowserRouter>
);

export default App;
