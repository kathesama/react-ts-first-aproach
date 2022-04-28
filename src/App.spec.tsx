import { act, screen, waitFor } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import i18n from '@/locale/i18n';

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
      ${'/user/1'} | ${'user-page'}
      ${'/unknown'} | ${'notFound-page'}
    `('displays $pageTestId when path is $path', async ({ path, pageTestId })=> {
      await setup(path);
      const notFound = await waitFor(() => screen.getByTestId(pageTestId));
      expect(notFound).toBeInTheDocument();
    });
  it.each`
        path | pageName
        ${'/'} | ${'Sign Up'}
        ${'/signup'} | ${'Login Page'}
        ${'/login'} | ${'Sign Up'}
        ${'/user'} | ${'Not Found'}
        ${'/unknown'} | ${'Login Page'}
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
    `('displays sign up page after clicking sign up link', async ({ initialPath, clickingTo, targetPage })=> {
      await setup(initialPath);

      const link = await screen.getByRole('link', { name: clickingTo });
      act(() => {
        userEvent.click(link);
      });
    expect(screen.getByTestId(targetPage)).toBeInTheDocument();
    });
});
