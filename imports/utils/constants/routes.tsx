import React from "react";
import Shirts from "/imports/ui/Shirts";        
import Pants from "/imports/ui/Pants";
import Shoes from "/imports/ui/Shoes";
import HomePage from "/imports/ui/HomePage";
import LoginPage from "/imports/ui/LoginPage";
import NotFoundPage from "/imports/ui/NotFoundPage";

export const publicRoutes = {
    loading : {   
        path: "/loading",
        element: ( <LoginPage /> ) as React.ReactNode,
    },
    home : {
        path: "/",
        element: ( <HomePage /> ) as React.ReactNode,
    },
    shirts : {  
        path: "/shirts",
        element: ( <Shirts /> ) as React.ReactNode, 
    },
    pants : {   
        path: "/pants",
        element: ( <Pants /> ) as React.ReactNode,  
    },
    shoes : {   
        path: "/shoes",
        element: ( <Shoes /> ) as React.ReactNode,
    },
    default : {   
        path: "*",
        element: ( <LoginPage /> ) as React.ReactNode,
    },
}

export const protectedRoutes = {
    default: {
        path: "/404",
        element: ( <NotFoundPage /> ) as React.ReactNode,
    },
}