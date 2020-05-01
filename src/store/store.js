// global and only store
import React, {createContext, useReducer} from 'react';

const ENDPOINT = process.env.ENDPOINT || "http://localhost:3000";

const initialState = { endpoint: ENDPOINT };
const store = createContext(initialState);
const { Provider } = store;


const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            default:
                throw new Error();
        ;}

    },initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }