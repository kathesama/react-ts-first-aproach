import { act } from "@testing-library/react";
import ReactDOM from "react-dom/client";
// import SignUpPage from "@/pages/signUpPage/signUpPage";
// import { render } from '@/_tests_/setup';
import Input from "./input";

let container: any;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
describe("input testing", () => {
  it('does not have is-invalid class for input when help is not set', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<Input />);
    });

    const input = container.querySelector('input');

    expect(input.classList).not.toContain('is-invalid');
  });
  it('has is-invalid class for input when error is set', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<Input error="Error message"/>);
    });

    const input = container.querySelector('input');

    expect(input.classList).toContain('is-invalid');
  });
  it('has invalid-feedback class for span when error is set', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<Input error="Error message"/>);
    });

    const input = container.querySelector('span');

    expect(input.classList).toContain('invalid-feedback');
  });
  it('it does not has is-invalid class for input when error is not set', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<Input error=""/>);
    });

    const input = container.querySelector('input');

    expect(input.classList).not.toContain('is-invalid');
  });
  it('it does not has invalid-feedback class for span when error is not set', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<Input error=""/>);
    });

    const input = container.querySelector('span');

    expect(input).toBe(null);
  });
})
