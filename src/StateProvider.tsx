import * as React from 'react';
import {createContext, useContext, useReducer} from 'react';

const initialState = {
  pageLocation: "DetailView",         
  selectedArea: "",
  timeFrame: "q2",
  addPanelExpanded: false,
  objectives: [],
  areas: [],
};

export const StateContext = createContext<[okrState, any]>([initialState, {}]);

export const StateProvider = ({reducer, initialState, children}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

interface okrState {
  pageLocation: string         
  selectedArea: any,
  timeFrame: string,
  addPanelExpanded: boolean,
  objectives: any,
  areas: any
}