import {Navigate, Outlet} from 'react-router-dom';
import AuthenticationContext from "../context/Authentication/AuthenticationContext";
import {useContext} from "react";
const PrivateRoute = () => {
    const loggedIn = useContext(AuthenticationContext);
    return loggedIn ? <Outlet/> : <Navigate to = '/login'/>
}

export default PrivateRoute;
