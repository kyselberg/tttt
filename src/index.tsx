import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './app';
import store from './store/index';
import './scss/reset.scss';
import './scss/app.scss';
import {saveToLocalStore, timersListKey, isLSAvailable} from './utils';

store.subscribe((): void => {
    saveToLocalStore(store.getState().timers.timersList, timersListKey);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

isLSAvailable() ?
    root.render(
      <React.StrictMode>
          <Provider store={store}>
              <App />
          </Provider>
      </React.StrictMode>
    ) : root.render(<h1>Please, allow usage of local storage</h1>);
