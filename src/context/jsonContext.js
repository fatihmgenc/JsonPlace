import React from "react";
import { useReducer } from "react";

const initialState = {
    json: {},
};


const reducer = ({ state, action }) => {
    switch (action.type) {
        case JSON_STATE_CHANGED:
            return {
                json: action.payload,
            };
    }
    return state;
};

const JsonContext = React.createContext();
const JsonProvider = (props) => {
    const [jsonState, dispatch] = useReducer(reducer, initialState);

    const actions = {
        jsonStateChanged: (obj) => {
            if (obj) {
                dispatch({ type: JSON_STATE_CHANGED, payload: obj });
            }
        },
    };

    return (
        <JsonContext.Provider
            value={{
                jsonState: jsonState,
                jsonActions: actions,
            }}
        >
            {props.children}
        </JsonContext.Provider>
    );
};

export { JsonProvider, JsonContext };
export const JSON_STATE_CHANGED = "JSON_STATE_CHANGED";
