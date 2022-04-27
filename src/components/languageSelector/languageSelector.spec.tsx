import { act, screen, waitFor } from "@testing-library/react";
import ReactDOM from "react-dom/client";

import LanguageSelector from "./languageSelector";

let container: any;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    ReactDOM.createRoot(container).render(<LanguageSelector />);
  });
});

afterEach(() => {
  container.remove();
  container = null;
});

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => ({
      t: (str: any) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }),
}));

describe("Language selector", () => {
  describe("Layout", () => {
    it.each`
      image 
       ${'enUsImg'}
       ${'esVeImg'}
    `("displays $image", async ({ image }) => {
      const languageImg = await waitFor(() => screen.getByTestId(image));

      expect(languageImg).toBeInTheDocument();
    });
  });
});