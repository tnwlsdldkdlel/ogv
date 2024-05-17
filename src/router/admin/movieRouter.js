import React, { Suspense, lazy } from 'react'
import PrivateRoute from "../privateRoute";

const IndexPage = lazy(() => import("../../pages/admin/movieMgmt/IndexPage"))
const AddPage = lazy(() => import("../../pages/admin/movieMgmt/AddPage"))
const InfoPage = lazy(() => import("../../pages/admin/movieMgmt/InfoPage"))

const movieRouter = () => {
    return [
        {
            path: "",
            element: <Suspense><PrivateRoute><IndexPage /></PrivateRoute></Suspense>
        },
        {
            path: "add",
            element: <Suspense><PrivateRoute><AddPage></AddPage></PrivateRoute></Suspense>
        },
        {
            path: "info/:seq",
            element: <Suspense><PrivateRoute><InfoPage></InfoPage></PrivateRoute></Suspense>
        }
    ]
}

export default movieRouter