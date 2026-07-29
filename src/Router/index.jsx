import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Layout from "../Layout";
import Brand from "../Pages/Brand";
import GetAllBrand from "../Pages/Brand/GetAll";
import CreateBrand from "../Pages/Brand/Create";
import UpdateBrand from "../Pages/Brand/Update";
const router=createBrowserRouter([
    {
        index:true,
        element:<Login/>
    },
    {
        path:'/dashboard',
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'brand',
                element:<Brand/>,
                children:[
                    {
                        index:true,
                        element:<GetAllBrand/>
                    },
                    {
                        path:'create',
                        element:<CreateBrand/>
                    },
                    {
                        path:'update/:id',
                        element:<UpdateBrand/>
                    },

                ]
            },

        ]
    }
])
export default router