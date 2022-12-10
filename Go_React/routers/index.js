import Main from "../components/main";
import Chart from "../components/chart";
import Register from "../components/register";
import Sorder from "../components/sorder";
import Login from "../components/login";
import UploadGoods from "../components/uploadGoods";
import Recharge from "../components/recharge";
import Person from "../components/person";
import ModifyGoods from "../components/modifyGoods";

const routers = [
    {
        path: "",
        element: <Main/>
    },
    {
        path:"/main",
        element:<Main/>
    },
    {
        path: "/chart",
        element: <Chart/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/sorder",
        element: <Sorder/>
    },
    {
        path: "/uploadGoods",
        element: <UploadGoods/>
    },
    {
        path: "/recharge",
        element: <Recharge/>
    },
    {
        path: "/person",
        element: <Person/>
    },
    {
        path: "/modifyGoods/:id",
        element: <ModifyGoods/>
    }
]
export default routers;