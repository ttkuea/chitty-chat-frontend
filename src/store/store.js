// global and only store
import React, {createContext, useReducer} from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = process.env.ENDPOINT || "http://localhost:3000";
const socket = window.gsocket = socketIOClient(ENDPOINT); // tolerate reload 

const initialState = {  loginUsername: 'testuser1', //TODO change to null
                        groups: [] };
const store = createContext(initialState);
const { Provider } = store;


const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'set':
                return {
                    ...state,
                    ...action.newState
                }
            case 'login':

                return {
                    ...state,
                    loginUsername: action.payload
                }

            default:
                throw new Error();
        ;}

    },initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider, socket }