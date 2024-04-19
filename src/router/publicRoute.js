import React from 'react'
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const publicRoute = ({ children }) => {
    const cookies = new Cookies();
    const isLogin = cookies.get("admin") !== undefined ? true : false;

    return isLogin ? <Navigate to="/admin/" /> : children;
}

export default publicRoute;
