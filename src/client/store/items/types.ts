export interface Item {
  login?: string;
  id: string;
  avatar_url?: string;
  full_name?: string;
  private?: boolean;
  html_url: string;
  owner?: any;
  description?: string;
  updated_at?: string;
  stargazers_count?: string;
  language?: string;
  forks_count?: string;
  open_issues_count?: string;
}

export enum ItemActionTypes {
  FETCH_REQUEST = '@@item/FETCH_REQUEST',
  FETCH_SUCCESS = '@@item/FETCH_SUCCESS',
  FETCH_ERROR = '@@item/FETCH_ERROR',
  SERVING_FROM_CACHE = '@@item/SERVING_FROM_CACHE',
}

export interface ItemState {
  readonly loading: boolean;
  readonly data: {
    [k: string]: Item[];
  };
  readonly errors?: string;
}
