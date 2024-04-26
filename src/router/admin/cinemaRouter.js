import React, { Suspense, lazy } from 'react'
import PrivateRoute from "../privateRoute";

const IndexPage = lazy(() => import("../../pages/admin/cinemaMgmt/IndexPage"))

const cinemaRouter = () => {
    return [
        {
            path: "",
            element: <Suspense><PrivateRoute><IndexPage /></PrivateRoute></Suspense>
        }
    ]
}

export default cinemaRouter