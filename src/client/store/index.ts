import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { ItemReducer } from './items/reducer';
import { ItemState } from './items/types';

export interface ApplicationState {
  item: ItemState;
}

const persistConfig = {
  key: 'root',
  storage,
};

export const createRootReducer = () =>
  persistReducer(
    persistConfig,
    combineReducers({
      item: ItemReducer,
    }),
  );
