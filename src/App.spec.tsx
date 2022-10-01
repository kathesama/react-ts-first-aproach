import { act, screen, waitFor } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import userEvent from '@testing-library/user-event';
import App from './App';
import i18n from './locale/i18n';

let container: any;

beforeEach(() => {
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

describe('App', () => {
  const setup = async (path: string) => {
    act(() => {
      ReactDOM.createRoot(container).render(<App />);
      window.history.pushState({}, '', path);
    });
  };

  it.each`
      path | pageTestId 
      ${'/'} | ${'header-page'}
      ${'/signup'} | ${'signup-page'}
      ${'/login'} | ${'login-page'}
      ${'/unknown'} | ${'notFound-page'}
      ${'/user/1'} | ${'user-page'}
      ${'/activate/123'} | ${'activation-page'}
      ${'/activate/MNMHGHjknh8'} | ${'activation-page'}
    `('displays $pageTestId when path is $path', async ({ path, pageTestId })=> {
      await setup(path);
      const notFound = await waitFor(() => screen.getByTestId(pageTestId));
      expect(notFound).toBeInTheDocument();
    });
  it.each`
        path | pageName
        ${'/'} | ${'Sign Up'}
        ${'/'} | ${'Activation Page'}
        ${'/signup'} | ${'Login Page'}
        ${'/signup'} | ${'Activation Page'}
        ${'/login'} | ${'Sign Up'}
        ${'/login'} | ${'Activation Page'}
        ${'/user'} | ${'Not Found'}
        ${'/user'} | ${'Activation Page'}
        ${'/unknown'} | ${'Login Page'}
        ${'/unknown'} | ${'Activation Page'}
        ${'/activate'} | ${'Sign Up'}
        ${'/activate'} | ${'Login Page'}
        ${'/activate'} | ${'Not Found'}
      `('does not display $pageName when path is $path', async ({ path, pageName })=> {
        await setup(path);
        const notFound = screen.queryByRole('heading', { name: pageName });
        expect(notFound).not.toBeInTheDocument();
    });
  it.each`
        path | targetPage
        ${'/'} | ${'header'}        
        ${'/'} | ${'signup'}        
        ${'/'} | ${'login'}        
      `('has link to $targetPage on NavBar', async ({ path, targetPage })=> {
        await setup(path);
        const link = await screen.getByRole('link', { name: targetPage })
        expect(link).toBeInTheDocument();
    });
  it.each`
        initialPath | clickingTo | targetPage
        ${'/'} | ${'signup'} | ${'signup-page'}
        ${'/signup'} | ${'header'} | ${'header-page'}
        ${'/login'} | ${'login'} | ${'login-page'}
    `('displays $clickingTo page after clicking $initialPath link', async ({ initialPath, clickingTo, targetPage })=> {
      await setup(initialPath);

      const link = await screen.getByRole('link', { name: clickingTo });
      act(() => {
        userEvent.click(link);
      });
      expect(screen.getByTestId(targetPage)).toBeInTheDocument();
    });
  it.each`
        path | testId | message        
        ${'/user'} | ${'invalidUrl-page'} | ${'Invalid url: params expected'}        
        ${'/activate'} | ${'invalidUrl-page'} | ${'Invalid url: params expected'}        
      `('does display $message when path is $path and there is no params', async ({ path, testId, message })=> {
        await setup(path);
        const invalidUrl = await waitFor(() => screen.getByTestId(testId));
        expect(invalidUrl).toBeInTheDocument();
    });
  it.each`
        path | testId | message        
        ${'/user/1'} | ${'invalidUrl-page'} | ${'Invalid url: params expected'}        
        ${'/activate/123'} | ${'invalidUrl-page'} | ${'Invalid url: params expected'}        
      `('does not display $message when path is $path and there is params', async ({ path, testId, message })=> {
        await setup(path);
        const invalidUrl = await waitFor(() => screen.queryByTestId(testId));
        expect(invalidUrl).not.toBeInTheDocument();
    });
});
