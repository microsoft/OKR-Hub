import * as React from 'react';
import {createContext, useContext, useReducer} from 'react';
import { applyMiddleware } from './OKRMiddleware';
import { useActions } from './OKRActions';
import { reducer, initialState } from './OKRReducers';

export const StateContext = createContext([initialState] as any);

export const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Attach middleware to capture every dispatch
  const enhancedDispatch = applyMiddleware(dispatch);
  const actions = useActions(state, enhancedDispatch);

  return (
    <StateContext.Provider value={[state, actions]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);