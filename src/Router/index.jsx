import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Layout from "../Layout";
import Brand from "../Pages/Brand";
import GetAllBrand from "../Pages/Brand/GetAll";
import CreateBrand from "../Pages/Brand/Create";
import UpdateBrand from "../Pages/Brand/Update";
import Category from "../Pages/Category";
import GetAllCategory from "../Pages/Category/GetAll";
import CreateCategory from "../Pages/Category/Create";
import UpdateCategory from "../Pages/Category/Update";
import Product from "../Pages/Product";
import GetAllProduct from "../Pages/Product/GetAll";
import CreateProduct from "../Pages/Product/Create";
import UpdateProduct from "../Pages/Product/Update";
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
            {
                path:'category',
                element:<Category/>,
                children:[
                    {
                        index:true,
                        element:<GetAllCategory/>
                    },
                    {
                        path:'create',
                        element:<CreateCategory/>
                    },
                    {
                        path:'update/:id',
                        element:<UpdateCategory/>
                    },

                ]
            },
            {
    path: 'product',
    element: <Product/>,
    children: [
        {
            index: true,
            element: <GetAllProduct/>
        },
        {
            path: 'create',
            element: <CreateProduct/>
        },
        {
            path: 'update/:id',
            element: <UpdateProduct/>
        },
    ]
}

        ]
    }
])
export default router