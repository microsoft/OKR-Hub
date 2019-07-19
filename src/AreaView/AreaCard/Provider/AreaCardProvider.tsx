import * as React from 'react';
import {createContext, useContext, useReducer} from 'react';

export const AreaCardContext = createContext([]);

export const AreaCardProvider = ({reducer, initialState, children}) => (
	<AreaCardContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</AreaCardContext.Provider>
);

export const useAreaCardValue = () => useContext(AreaCardContext);