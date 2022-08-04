import {createContext, useReducer} from "react";
import AuthenticationReducer from "./AuthenticationReducer";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({children}) => {
    const initialState = {
        user: null,

    }
    const[state, dispatch] = useReducer(AuthenticationReducer, initialState);

    return(
        <AuthenticationContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContext;