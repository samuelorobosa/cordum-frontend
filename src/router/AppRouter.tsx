import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import React, {useContext, useEffect} from "react";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import Overview from "../components/Overview";
import AuthenticationContext from "../context/Authentication/AuthenticationContext";

function AppRouter(){
    const {dispatch} = useContext(AuthenticationContext);

    //Check if user is logged in
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('gkc__auth');
            if(token) {
                dispatch({
                    type: 'ASSIGN_USER',
                    payload: JSON.parse(token),
                })
            }
        };
        checkAuth();
    }, [dispatch]);
    return(
        <>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<PrivateRoute/>} >
                    <Route path="/" element={<Overview/>} />
                </Route>
            </Routes>
        </>
    )
}

export default AppRouter;