import React, { Suspense, lazy } from 'react'
import PrivateRoute from "../privateRoute";

const IndexPage = lazy(() => import("../../pages/admin/cinemaMgmt/IndexPage"))
const AddPage = lazy(() => import("../../pages/admin/cinemaMgmt/AddPage"))

const cinemaRouter = () => {
    return [
        {
            path: "",
            element: <Suspense><PrivateRoute><IndexPage /></PrivateRoute></Suspense>
        },
        {
            path: "add",
            element: <Suspense><PrivateRoute><AddPage /></PrivateRoute></Suspense>
        }
    ]
}

export default cinemaRouter