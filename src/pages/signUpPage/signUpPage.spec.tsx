import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { DefaultRequestMultipartBody, rest } from 'msw';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import i18n from '../../locale/i18n';
import en from '../../locale/en.json';
import es from '../../locale/es.json';
import SignUpPage from '../../pages/signUpPage/signUpPage';
import LanguageSelector from '../../components/languageSelector/languageSelector';
import { getPostUserUrl } from '../../utilities/routes';

const mock = new MockAdapter(axios);
let acceptLanguageHeader: string | null ;
let requestBody: string | number | boolean | Record<string, any> | DefaultRequestMultipartBody | null | undefined;
let counter = 0;
let container: any;

mock.onPost(getPostUserUrl()).reply((options: any) => {
  acceptLanguageHeader = options?.headers?.get('Accept-Language');
  return [200, {}];
});

const server = setupServer(
  rest.post(getPostUserUrl(), (req, res, ctx) => {
    requestBody = req.body;
    counter += 1;
    acceptLanguageHeader = req.headers.get('Accept-Language');
    return res(ctx.status(200));
  })
);

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('SignUp Page', () => {
  describe('Layout', () => {
    it('has header', () => {
      act(() => {
        ReactDOM.createRoot(container).render(<SignUpPage />);
      });
      const header = screen.queryByRole('heading', { name: 'Sign Up' });

      expect(header).toBeInTheDocument();
    });
    it('has username input', () => {
      act(() => {
        ReactDOM.createRoot(container).render(<SignUpPage />);
      });
      // const { container } = render(<SignUpPage />);
      const input: any = container.querySelector("input[name='username']");
      expect(input).toBeInTheDocument();
    });
    it('has email input', () => {
      act(() => {
        ReactDOM.createRoot(container).render(<SignUpPage />);
      });
      const input: any = screen.getByPlaceholderText('Email');
      expect(input).toBeInTheDocument();
    });
    it('has password input', () => {
      act(() => {
        ReactDOM.createRoot(container).render(<SignUpPage />);
      });
      const input: any = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
    });
    it('has password repeat input', () => {
      // const { container } = render(<SignUpPage />);
      act(() => {
        ReactDOM.createRoot(container).render(<SignUpPage />);
      });
      const input: any = container.querySelector("input[name='confirmPassword']");
      expect(input).toBeInTheDocument();
    });
    it('has password type for repeat input', () => {
      act(() => {
        ReactDOM.createRoot(container).render(<SignUpPage />);
      });
      const input: any = screen.getByLabelText('Confirm Password');
      expect(input.type).toBe('password');
    });
    it('has signup button', () => {
      act(() => {
        ReactDOM.createRoot(container).render(<SignUpPage />);
      });
      const button: any = screen.queryByRole('button',{name: 'Sign Up'});
      expect(button).toBeInTheDocument();
    });
    it('disables signup button initially', () => {
      act(() => {
        ReactDOM.createRoot(container).render(<SignUpPage />);
      });
      const button: any = screen.queryByRole('button',{name: 'Sign Up'});
      expect(button).toBeDisabled();
    });
  });
  describe('Interactions', ()=> {
    let button: any;
    let username: any;
    let email: any;
    let inputPassword: any;
    let inputPasswordConfirm: any;

    const setup = async () => {
      act(() => {
        ReactDOM.createRoot(container).render(<SignUpPage />);
      });

      username = await waitFor(() => screen.getByTestId('username'));
      inputPassword = await waitFor(() => screen.getByTestId('password'));
      inputPasswordConfirm = await waitFor(() => screen.getByTestId('confirmPassword'));
      email = await waitFor(() => screen.getByTestId('email'));

      act(() => {
        userEvent.type(username, 'user01');
        userEvent.type(inputPassword, '!123456Pa');
        userEvent.type(inputPasswordConfirm, '!123456Pa');
        userEvent.type(email, 'user01@domain.com');
        button = container.querySelector('button', { name: 'Sign Up' });
      });
    };

    const generateValidationError = (field: string, message: string) => rest.post(getPostUserUrl(), (req, res, ctx) => res(ctx.status(400), ctx.json({
      message: 'Validation Failure',
      validationErrors: {
        [field]: message,
      },
    })));

    it('enables the button when password and password repeat fields have same value', async () => {
      await setup();

      expect(button).not.toBeDisabled();
    });
    it('send username, email and password to bck after click submit', async () => {
      await setup();
      userEvent.click(button);

      await waitFor(() => {
        expect(requestBody).toEqual({
          username: 'user01',
          email: 'user01@domain.com',
          password: '!123456Pa',
        });
      });
    });
    it('disables button when there is an ongoing call', async () => {
      await setup();

      await userEvent.click(button);
      await userEvent.click(button);

      expect(counter).toBe(1);
    });
    it('displays spinner after clicking the submit', async () => {
      await setup();

      act(() => {
        userEvent.click(button);
      });

      const spinner = await waitFor(() => screen.getByRole('status', { hidden: true}));

      expect(spinner).toBeInTheDocument();
    });
    it('not display spinner when there is not an ongoing call', async () => {
      await setup();
      act(() => {
        userEvent.click(button);
      });
      const spinner = screen.queryByRole('status');

      expect(spinner).not.toBeInTheDocument();
    });
    it('displays account activation notification after success sign up request', async () => {
      await setup();
      act(() => {
        userEvent.click(button);
      });

      const text = await screen.findByText('Account activation email sent');
      expect(text).toBeInTheDocument();
    });
    // it("displays validation message for username", async () => {
    //   server.use(
    //     rest.post(getPostUserUrl(), (req, res, ctx) => res(ctx.status(400), ctx.json({
    //       message: "Validation Failure",
    //       validationErrors: {
    //         username: "Username cannot be null",
    //       },
    //     })))
    //   );
    //
    //   await setup();
    //   act(() => {
    //     userEvent.click(button);
    //   });
    //
    //   const text = await screen.findByText("Username cannot be null");
    //   expect(text).toBeInTheDocument();
    // });
    it('hide spinner after activation error', async () => {
      server.use(generateValidationError('message', 'Validation Failure'));
      await setup();
      act(() => {
        userEvent.click(button);
      });

      const spinner = await screen.queryByRole('status');
      expect(spinner).not.toBeInTheDocument();
    });
    it('hide spinner after activation success', async () => {
      await setup();

      act(() => {
        userEvent.click(button);
      });

      const spinner = await screen.queryByRole('status');
      await screen.findByText(
        'Account activation email sent'
      );
      expect(spinner).toBe(null);
    });
    it.each`
      field | message
      ${'username'} | ${'Username cannot be null'}
      ${'email'} | ${'Email cannot be null'}
      ${'password'} | ${'Password cannot be null'}
    `('displays $message for $field', async ({ field, message })=> {
      server.use(generateValidationError(field, message));
      await setup();
      act(() => {
        userEvent.click(button);
      });

      const text = await screen.findByText(message);
      expect(text).toBeInTheDocument();
    });
    it('displays mismatch message for password repeat', async () => {
      await setup();
      inputPasswordConfirm = '!123456Pawrong';

      act(() => {
        userEvent.click(button);
      });

      const validationError = await screen.findByText('Password mismatch');
      expect(validationError).toBeInTheDocument();
    });
    // it("clear validation error after username is updated", async () => {
    //   server.use(generateValidationError('username', 'Username cannot be null'));
    //   await setup();
    //
    //   act(() => {
    //     userEvent.click(button);
    //   });
    //
    //   const validationError = await screen.findByText("Username cannot be null");
    //   act(() => {
    //     userEvent.type(username, "user01");
    //   });
    //   expect(validationError).not.toBeInTheDocument();
    // });
    it.each`
      field | message | label
      ${'username'} | ${'Username cannot be null'} | ${'Username'}
      ${'email'} | ${'Email cannot be null'} | ${'Email'}
      ${'password'} | ${'Password cannot be null'} | ${'Password'}
    `('clear validation error after  $field is updated', async ({ field, message, label })=> {
      server.use(generateValidationError(field, message));
      await setup();
      act(() => {
        userEvent.click(button);
      });

      const validationError = await screen.findByText(message);
      act(() => {
        userEvent.type(screen.getByLabelText(label), 'updated');
      });

      expect(validationError).not.toBeInTheDocument();
    });
  });
  describe('Internationalization', () => {
    let spanishToggle: Element;
    let englishToggle: Element;
    let passwordInput: Element;
    let inputPasswordConfirm: Element;
    let button: any;

    const elementChecker = async (langFile: any) => {
      expect(await screen.getByRole('heading', { name: langFile.signUp })).toBeInTheDocument();
      expect(await screen.getByRole('button', { name: langFile.signUpBtn })).toBeInTheDocument();
      expect(await screen.getByLabelText(langFile.username)).toBeInTheDocument();
      expect(await screen.getByLabelText(langFile.email)).toBeInTheDocument();
      expect(await screen.getByLabelText(langFile.password)).toBeInTheDocument();
      expect(await screen.getByLabelText(langFile.passwordRepeat)).toBeInTheDocument();
    };

    const setup = async () => {
      act(() => {
        ReactDOM.createRoot(container).render(
          <>
            <LanguageSelector />
            <SignUpPage />
          </>
        );
      });
      spanishToggle = await screen.getByTitle('Spanish');
      englishToggle = await screen.getByTitle('English');
      passwordInput = await screen.findByText(en.password);
      inputPasswordConfirm = await screen.findByText(en.passwordRepeat);
      button = container.querySelector('button', { name: en.signUpBtn });
    };

    afterEach(() => {
      act(() => {
        i18n.changeLanguage('en');
      });
    });

    it('initially displays English labels', async () => {
      await setup();

      await elementChecker(en);
    });
    it('initially displays Spanish labels after change language', async () => {
      await setup();

      act(() => {
        userEvent.click(spanishToggle);
      });
      await elementChecker(es);
    });
    it('initially displays English labels after change back from Spanish', async () => {
      await setup();

      act(() => {
        userEvent.click(spanishToggle);
      });

      act(() => {
        userEvent.click(englishToggle);
      });
      await elementChecker(en);
    });
    it('display password mismatch error validation in spanish', async () => {
      await setup();

      act(() => {
        userEvent.click(spanishToggle);
      });

      passwordInput = await screen.findByText(es.password);

      act(() => {
        userEvent.type(passwordInput, 'Pa$s1!0rd');
      });

      const validationMessage = await screen.findByText(es.passwordMismatchValidation);

      expect(validationMessage).toBeInTheDocument();
    });
    it ('Send accepted language header as en for outgoing request', async () => {
      await setup();

      act(() => {
        userEvent.type(passwordInput, 'Pa$s1!0rd');
        userEvent.type(inputPasswordConfirm, 'Pa$s1!0rd');
        button = screen.getByRole('button', { name: en.signUpBtn });
        userEvent.click(button);
        expect(acceptLanguageHeader).toBe('en');
      });
    });
    it ('Send accepted language header as es for outgoing request after selecting a Spanish', async () => {
      await setup();

      act(() => {
        userEvent.type(passwordInput, 'Pa$s1!0rd');
        userEvent.type(inputPasswordConfirm, 'Pa$s1!0rd');
      })

      act(() => {
        userEvent.click(spanishToggle);
      });

      await act(() => {
        userEvent.click(button);
      });

      await expect(acceptLanguageHeader).toBe('es');
    })
  })
});
