import { lazy } from "react";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";

const { createBrowserRouter } = require("react-router-dom");

const Main = lazy(() => import("../pages/MainPage"))
const Login = lazy(() => import("../pages/LoginPage"))

const root = createBrowserRouter([

    {
        path: "",
        element: <PrivateRoute><Main /></PrivateRoute>
    },
    {
        path: "login",
        element: <PublicRoute><Login /></PublicRoute>

    }
])

export default root;