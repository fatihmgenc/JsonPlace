import React from "react";
import { useReducer } from "react";

const initialState = {
    json: {},
    typeArray: [],
    isLoading: false,
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
            debugger;
            return {
                ...state,
                isLoading: action.payload,
            };

        // case JSON_CHANGED:
        //     return {
        //         ...state,
        //         json: { ...state.json, ...action.payload },
        //     };
        // case TYPEARRAY_CHANGED:
        //     return {
        //         ...state,
        //         typeArray: [...state.typeArray, ...action.payload],
        //     };
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
        setLoading: (obj) => {
            console.log(obj, "context");
            if (obj) {
                dispatch({ type: SET_LOADING, payload: obj });
            }
        },
        typesArrayChanged: (obj) => {
            if (obj) {
                dispatch({ type: TYPEARRAY_CHANGED, payload: obj });
            }
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
