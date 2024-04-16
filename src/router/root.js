import { Suspense, lazy } from "react";

const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading....</div>

const Main = lazy(() => import("../pages/MainPage"))
const Login = lazy(() => import("../pages/LoginPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "login",
        element: <Suspense fallback={Loading}><Login></Login> </Suspense>

    }
])

export default root;