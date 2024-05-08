import { lazy } from "react";
import PublicRoute from "../publicRoute";
import PrivateRoute from "../privateRoute";
import userMgmtRouter from "./userMgmtRouter";
import cinemaRouter from "./cinemaRouter";
import movieRouter from "./movieRouter";

const Main = lazy(() => import("../../pages/admin/MainPage"))
const AdminLogin = lazy(() => import("../../pages/admin/LoginPage"))

const adminRouter = () => {
    return [

        {
            path: "",
            element: <PrivateRoute><Main /></PrivateRoute>
        },
        {
            path: "login",
            element: <PublicRoute><AdminLogin /></PublicRoute>

        },
        {
            path: "user",
            children: userMgmtRouter()

        },
        {
            path: "cinema",
            children: cinemaRouter()
        },
        {
            path: "movie",
            children: movieRouter()
        }
    ]
}

export default adminRouter;