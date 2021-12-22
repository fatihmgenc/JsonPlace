import React from "react";
import { useReducer } from "react";

const initialState = {
    json: {},
    typeArray: [],
    isLoading: false,
    isLoginModalOpen: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case JSON_CHANGED:
            return {
                ...state,
                json: action.payload,
            };
        case TYPEARRAY_CHANGED:
            return {
                ...state,
                typeArray: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case SET_IS_LOGIN_MODEL_OPEN:
            return {
                ...state,
                isLoginModalOpen: action.payload,
            };
    }
    return state;
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
