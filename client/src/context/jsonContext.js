import React from "react";
import { useReducer } from "react";

const defaults = {
    json: {},
    typeArray: [],
    isLoading: false,
    isLoginModalOpen: false,
    authorizedUser: {}
};

const initialState = {
    ...defaults,
    ...JSON.parse(localStorage.getItem('initialState')),
}

const reducer = (state, action) => {
    switch (action.type) {
        case JSON_CHANGED: {
            let tempState = {
                ...state,
                json: action.payload,
            }
            localStorage.setItem('initialState', JSON.stringify(tempState))
            return tempState;
        }
        case TYPEARRAY_CHANGED: {
            let tempState = {
                ...state,
                typeArray: action.payload,
            };
            localStorage.setItem('initialState', JSON.stringify(tempState))
            return tempState;
        }
        case SET_LOADING: {
            let tempState = {
                ...state,
                isLoading: action.payload,
            };
            localStorage.setItem('initialState', JSON.stringify(tempState))
            return tempState;
        }
        case SET_IS_LOGIN_MODEL_OPEN: {
            let tempState = {
                ...state,
                isLoginModalOpen: action.payload,
            };
            localStorage.setItem('initialState', JSON.stringify(tempState))
            return tempState;
        }
        case SET_AUTHORIZED_USER: {
            let tempState = {
                ...state,
                authorizedUser: action.payload,
            };
            localStorage.setItem('initialState', JSON.stringify(tempState))
            return tempState;
        }
    };
};

const JsonContext = React.createContext();

const JsonProvider = (props) => {
    const [contextState, dispatch] = useReducer(reducer, initialState);

    const actions = {
        jsonChanged: (obj) => {
            if (obj) {
                dispatch({ type: JSON_CHANGED, payload: obj });
            }
        },
        setLoading: (data) => {
            dispatch({ type: SET_LOADING, payload: data });
        },
        typesArrayChanged: (obj) => {
            if (obj) {
                dispatch({ type: TYPEARRAY_CHANGED, payload: obj });
            }
        },
        isLoginModalOpenChanged: (bool) => {
            dispatch({ type: SET_IS_LOGIN_MODEL_OPEN, payload: bool });
        },
        setAuthorizedUser: (user) => {
            dispatch({ type: SET_AUTHORIZED_USER, payload: user });
        }
    };


    return (
        <JsonContext.Provider
            value={{
                contextState: contextState,
                contextStateActions: actions,
            }}
        >
            {props.children}
        </JsonContext.Provider>
    );
};

export { JsonProvider, JsonContext };
export const JSON_CHANGED = "JSON_CHANGED";
export const TYPEARRAY_CHANGED = "TYPEARRAY_CHANGED";
export const SET_LOADING = "SET_LOADING";
export const SET_IS_LOGIN_MODEL_OPEN = "SET_IS_LOGIN_MODEL_OPEN";
export const SET_AUTHORIZED_USER = "SET_AUTHORIZED_USER";
