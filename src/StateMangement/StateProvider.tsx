import * as React from 'react';
import {createContext, useContext, useReducer} from 'react';
import { applyMiddleware } from './OKRMiddleware';
import { useActions, IOKRActions } from './OKRActions';
import { reducer, initialState } from './OKRReducers';
import { OKRMainState } from './OKRState';

export interface IOKRContext {
    state: OKRMainState;
    actions: IOKRActions;
}

export const StateContext = createContext({state: initialState, actions: undefined} as IOKRContext);

export const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Attach middleware to capture every dispatch
  const enhancedDispatch = applyMiddleware(dispatch, state);
  const actions = useActions(state, enhancedDispatch);

  return (
    <StateContext.Provider value={{ state, actions } as IOKRContext}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);