// global and only store
import React, {createContext, useReducer} from 'react';
import socketIOClient from 'socket.io-client';
import { clone } from 'ramda';

const ENDPOINT = process.env.ENDPOINT || "http://rod41732.ml:3000";
const socket = window.gsocket = socketIOClient(ENDPOINT); // tolerate reload 

const initialState = {  loginUsername: null, //TODO change to null
    loginId: null };
const store = createContext(initialState);
const { Provider } = store;


const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
    let newState;
        switch(action.type) {
            case 'set':
                console.log('set', action.newState)
                newState = {
                    ...state,
                    ...clone(action.newState)
                };
                return newState;
            case 'setGroup':
                newState = {
                    ...state,
                    ...clone(action.groups)
                };
                return newState;
         	case 'login':
        		newState = {
          			...state,
                      loginUsername: action.loginUsername,
                      loginId: action.loginId
                };
                return newState;
            default:
                throw new Error();
        ;}

    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider, socket }
