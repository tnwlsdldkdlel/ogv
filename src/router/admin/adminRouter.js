import { lazy } from "react";
import PublicRoute from "../publicRoute";
import PrivateRoute from "../privateRoute";
import userMgmtRouter from "./userMgmt/userMgmtRouter";

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
            path: "userMgmt",
            children: userMgmtRouter()

        },
    ]
}

export default adminRouter;