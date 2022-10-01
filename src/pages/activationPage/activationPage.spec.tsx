import React, { useState } from 'react';
import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
// import { renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom/client';
import userEvent from '@testing-library/user-event';
// import i18n from '@/locale/i18n';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setupServer } from 'msw/node';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { DefaultRequestMultipartBody, rest } from 'msw';
import { tokenUserUrl } from '../../utilities/routes';
import useAxios from '../../hooks/useAxios/useAxios';
import i18n from '../../locale/i18n';
import ActivationPage from './activationPage';

// import en from '@/locale/en.json';
// import es from '@/locale/es.json';
// import ActivationPage from '@/pages/activationPage/activationPage';
// import { getPostUserUrl, tokenUserUrl } from '@/utilities/routes';
// import useAxios from '@/hooks/useAxios/useAxios';

let container: any;
let counter = 0;
const token: string = '1234';
const mock = new MockAdapter(axios);
let acceptLanguageHeader: string | null ;
let requestBody: string | number | boolean | Record<string, any> | DefaultRequestMultipartBody | null | undefined;

// mock.onPost(tokenUserUrl(token)).reply((options: any) => {
//   acceptLanguageHeader = options?.headers?.get('Accept-Language');
//   return [200, { message: 'account_activation_success '}];
// });

// const setStateMock = jest.fn();
// const useStateMock: any = (useState: any) => [useState, setStateMock];
// jest.spyOn(React, 'useState').mockImplementation(useStateMock);

const server = setupServer(
  rest.post(tokenUserUrl(token), (req, res, ctx) => {
    const { result } = renderHook(useAxios);

    act(() => {
      result.current.success = true;
    });

    requestBody = req.body;
    acceptLanguageHeader = req.headers.get('Accept-Language');
    counter += 1;
    ctx.status(200);
    return res(ctx.json({ message: 'account_activation_success '}));
  })
);

beforeEach(() => {
  server.resetHandlers();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(async () => {
  document.body.removeChild(container);
  container = null;
  await act(async () => {
    await i18n.changeLanguage('en');
  });
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('ActivationPage test', () => {
  const matchObj = {
    params: {
      token: '1234',
    },
  };
  const renderComponent = ({ token= '' }) =>
    render(
      <MemoryRouter initialEntries={[`/activate/${token}`]}>
        <Routes>
          <Route path="/activate/:token" element={<ActivationPage />} />
        </Routes>
      </MemoryRouter>
    );
  const setup = async (path: string, matchObj: any) => {
    act(() => {
      ReactDOM.createRoot(container).render(<ActivationPage match={matchObj}/>);
      // window.history.pushState({}, '', path);
    });
  };
  describe('ActivationPage render', () => {
    it('should render ActivationPage', async () => {
      await setup('/activate/123456789',  {});
      await waitFor(() => {
        expect(screen.getByText(/Activation Page/i)).toBeInTheDocument();
      });
    });
  });
  describe('Functionality', () => {

    // it('display activation success when token is valid', async () => {
    //   await setup('/activate/1234', matchObj);
    //   await waitFor(() => {
    //     expect(screen.getByText(/Account is activated/i)).toBeInTheDocument();
    //   });
    // });
    it('sends activation request to backend', async () => {
      // window.history.pushState({}, '', '/activate/1234');
      // await setup('/activate/1234', matchObj);
      renderComponent({ token: '1234' });
      let message: any;

      act(() => {
        message = screen.getByText(/Account is activated/i)
      });
      expect(counter).toBe(1);
    });
  });
});
