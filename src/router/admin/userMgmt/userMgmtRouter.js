import { lazy } from "react";
import PrivateRoute from "../../privateRoute";
import AddPage from "../../../pages/admin/userMgmt/AddPage";

const IndexPage = lazy(() => import("../../../pages/admin/userMgmt/IndexPage"))

const userMgmtRouter = () => {
    return [
        {
            path: "",
            element: <PrivateRoute><IndexPage /></PrivateRoute>
        },
        {
            path: "add",
            element: <PrivateRoute><AddPage /></PrivateRoute>
        }
    ]
}

export default userMgmtRouter;