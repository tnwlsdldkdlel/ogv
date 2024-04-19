import adminRouter from "./admin/adminRouter";

const { createBrowserRouter } = require("react-router-dom");

const root = createBrowserRouter([
    {
        path: "admin",
        children: adminRouter()
    },
])

export default root;