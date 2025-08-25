import React from "react";
import Shirts from "/imports/ui/Shirts";        
import Pants from "/imports/ui/Pants";
import Shoes from "/imports/ui/Shoes";
import BrowsePage from "../../ui/BrowsePage";
import LoginPage from "/imports/ui/LoginPage";
import NotFoundPage from "/imports/ui/NotFoundPage";
import SignupPage from "/imports/ui/SignupPage";

export const publicRoutes = {
    login : {   
        path: "/login",
        element: ( <LoginPage /> ) as React.ReactElement,
    },
    signup : {   
        path: "/signup",
        element: ( <SignupPage /> ) as React.ReactElement,
    },
    home : {
        path: "/",
        element: ( <BrowsePage /> ) as React.ReactElement,
    },
    shirts : {  
        path: "/shirts",
        element: ( <Shirts /> ) as React.ReactElement, 
    },
    pants : {   
        path: "/pants",
        element: ( <Pants /> ) as React.ReactElement,  
    },
    shoes : {   
        path: "/shoes",
        element: ( <Shoes /> ) as React.ReactElement,
    },
    default : {   
        path: "*",
        element: ( <LoginPage /> ) as React.ReactElement,
    },
}

export const protectedRoutes = {
    default: {
        path: "/404",
        element: ( <NotFoundPage /> ) as React.ReactElement,
    },
}