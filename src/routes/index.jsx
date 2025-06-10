import { lazy } from "react";

const routes = [
    {
        path: "/",
        element: lazy(()=>import('../pages/Home') ),
    },
    {
        path:"/dashboard",
        element:lazy(()=>import("../pages/dashboard"))
    },
      {
        path:"/login",
        element:lazy(()=>import("../pages/login"))
    }
];

export default routes;

