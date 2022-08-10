import {Navigate, Outlet} from 'react-router-dom';
const PrivateRoute = () => {
        const user = localStorage.getItem('gkc__auth');
        return user !== null ? <Outlet/> : <Navigate to = '/login'/>
}
export default PrivateRoute;
