import React from 'react'
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const privateRoute = ({ children }) => {
    const cookies = new Cookies();
    const isLogin = cookies.get("admin") !== undefined ? true : false;

    return isLogin ? children : <Navigate to="/login"></Navigate>
}

export default privateRoute 
