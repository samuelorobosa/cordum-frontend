import {Navigate, Outlet} from 'react-router-dom';
const PrivateRoute = () => {
    const loggedIn = false;
    return loggedIn ? <Outlet/> : <Navigate to = '/login'/>
}

export default PrivateRoute;
