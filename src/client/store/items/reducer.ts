import { Reducer } from 'redux';
import { ItemActionTypes, ItemState } from './types';

export const initialState: ItemState = {
  data: {},
  errors: undefined,
  loading: false,
};

const reducer: Reducer<ItemState> = (state = initialState, action) => {
  switch (action.type) {
    case ItemActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case ItemActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [action.payload.key]: {
            data_items: action.payload.value,
            count: action.payload.count,
          },
        },
      };
    }
    case ItemActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case ItemActionTypes.SERVING_FROM_CACHE: {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};

export { reducer as ItemReducer };
