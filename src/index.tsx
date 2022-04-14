import React from 'react'
// import ReactDOM from 'react-dom'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'

import App from './App'
import store from './redux/store'
// import reportWebVitals from './reportWebVitals'

import './index.scss'

const persistor = persistStore(store);
// const root = createRoot(document.getElementById('root')!);
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="container">
          <App />
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
