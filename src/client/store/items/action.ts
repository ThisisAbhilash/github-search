import { ItemActionTypes } from './types';

import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ApplicationState } from '../index';
import { fetchItems } from '../../api';

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;

export interface SearchPayload {
  search_type: string;
  search_text: string;
  page: number;
  per_page: number;
}

export const fetchRequest: AppThunk = (payload: SearchPayload) => {
  return async (
    dispatch: Dispatch,
    getState: () => ApplicationState,
  ): Promise<Action> => {
    try {
      const { search_type, search_text, page = 1, per_page = 48 } = payload;
      if (page === 1) {
        dispatch({
          type: ItemActionTypes.FETCH_REQUEST,
        });
      }
      const key = `${search_type}_${search_text
        .replace(' ', '+')
        .toLowerCase()}_${page}_${per_page}`;
      const {
        item: { data },
      }: ApplicationState = getState();
      const existingData = data[key];
      if (existingData) {
        return dispatch({
          type: ItemActionTypes.SERVING_FROM_CACHE,
        });
      }
      const items = await fetchItems(payload);

      return dispatch({
        type: ItemActionTypes.FETCH_SUCCESS,
        payload: {
          key,
          value: items.data.items,
          count: items.data.total_count,
        },
      });
    } catch (e) {
      return dispatch({
        type: ItemActionTypes.FETCH_ERROR,
      });
    }
  };
};
