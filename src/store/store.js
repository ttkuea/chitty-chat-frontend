// global and only store
import React, {createContext, useReducer} from 'react';
import socketIOClient from 'socket.io-client';
import { clone } from 'ramda';

const ENDPOINT = process.env.ENDPOINT || "http://localhost:3000";
const socket = window.gsocket = socketIOClient(ENDPOINT); // tolerate reload 

const initialState = {  loginUsername: null, //TODO change to null
    loginId: null };
const store = createContext(initialState);
const { Provider } = store;


const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'set':
                console.log('set', action.newState)
                const newState = {
                    ...state,
                    ...clone(action.newState)
                };
                return newState;
            case 'setGroup':
                return {
                    ...state,
                    ...clone(action.groups)
                }
         	case 'login':
        		return {
          			...state,
                      loginUsername: action.loginUsername,
                      loginId: action.loginId
        		};
            default:
                throw new Error();
        ;}

    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider, socket }
