import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './route';
import configureStore from './configure-store';
import { ApplicationState } from './store';
import './index.css';

const initialState: ApplicationState = {
  item: {
    data: {},
    errors: undefined,
    loading: false,
  },
};

const { store, persistor } = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
