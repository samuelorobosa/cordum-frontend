import {Navigate, Outlet} from 'react-router-dom';
import AuthenticationContext from "../context/Authentication/AuthenticationContext";
import {useContext} from "react";
const PrivateRoute = () => {
    const {user} = useContext(AuthenticationContext);
     if(user !== null){
         console.log(user);
         return <Outlet/>
     }
     return  <Navigate to = '/login'/>
}

export default PrivateRoute;
