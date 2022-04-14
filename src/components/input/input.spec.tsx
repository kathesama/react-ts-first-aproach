import { act } from "@testing-library/react";
import ReactDOM from "react-dom/client";
import SignUpPage from "@/pages/signUpPage/signUpPage";
import { render } from '@/_tests_/setup';
import Input from './input';

let container: any;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

it('does not have is-invalid class for input when help is not set', () => {
  act(() => {
    ReactDOM.createRoot(container).render(<SignUpPage />);
  });

  const input = container.querySelector('input');

  expect(input.classList).not.toContain('is-invalid');
});