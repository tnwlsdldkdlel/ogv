import { Suspense, lazy } from "react";
import PrivateRoute from "../privateRoute";

const IndexPage = lazy(() => import("../../pages/admin/userMgmt/IndexPage"))
const AddPage = lazy(() => import("../../pages/admin/userMgmt/AddPage"))
const InfoPage = lazy(() => import("../../pages/admin/userMgmt/InfoPage"))

const userMgmtRouter = () => {
    return [
        {
            path: "",
            element: <Suspense><PrivateRoute><IndexPage /></PrivateRoute></Suspense>
        },
        {
            path: "add",
            element: <Suspense><PrivateRoute><AddPage /></PrivateRoute></Suspense>
        },
        {
            path: "info/:seq",
            element: <Suspense><PrivateRoute><InfoPage /></PrivateRoute></Suspense>
        }
    ]
}

export default userMgmtRouter;