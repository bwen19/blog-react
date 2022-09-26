import { createContext, useContext } from 'react';
import { ListUsersResponse, Order, UserItem, UserOrderBy } from '@/api';

// -------------------------------------------------------------------
// Users reducer
export interface UsersState {
  isLoading: boolean;
  loadCount: number;
  error: string;
  total: number;
  users: UserItem[];
  selected: readonly number[];
  pageId: number;
  pageSize: number;
  order: Order;
  orderBy: UserOrderBy;
  keyword?: string;
}

export const initialState: UsersState = {
  isLoading: false,
  loadCount: 0,
  error: '',
  total: 0,
  users: [],
  selected: [],
  pageId: 0,
  pageSize: 5,
  order: 'asc',
  orderBy: 'createAt',
};

export type UsersAction =
  | { type: 'setIsLoading'; value: boolean }
  | { type: 'reload' }
  | { type: 'setError'; error: string }
  | { type: 'setUsers'; data: ListUsersResponse }
  | { type: 'setSelected'; selected: readonly number[] }
  | { type: 'setPageId'; pageId: number }
  | { type: 'setPageSize'; pageSize: number }
  | { type: 'setSort'; order: Order; orderBy: UserOrderBy }
  | { type: 'setKeyword'; keyword: string };

export function usersReducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case 'setIsLoading':
      return { ...state, isLoading: action.value };
    case 'reload':
      return { ...state, loadCount: state.loadCount + 1, selected: [] };
    case 'setError':
      return { ...state, error: action.error, isLoading: false };
    case 'setUsers':
      return { ...state, users: action.data.users, total: Number(action.data.total), isLoading: false };
    case 'setSelected':
      return { ...state, selected: action.selected };
    case 'setPageId':
      return { ...state, pageId: action.pageId, selected: [] };
    case 'setPageSize':
      return { ...state, pageSize: action.pageSize, pageId: 0, selected: [] };
    case 'setSort':
      return { ...state, order: action.order, orderBy: action.orderBy };
    case 'setKeyword':
      return { ...state, keyword: action.keyword };
    default:
      return state;
  }
}

export const UsersContext = createContext<{
  state: UsersState;
  dispatch: React.Dispatch<UsersAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useUsersContext = () => useContext(UsersContext);